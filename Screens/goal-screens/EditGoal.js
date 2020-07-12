import React, {useCallback, useEffect, useState} from "react";
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert} from "react-native";
import {HeadingText} from "../../components/ui/HeadingText";
import {AppText} from "../../constants/text";
import {CustomText} from "../../components/ui/Text";
import {Input,Button} from "react-native-elements";
import NewGoalInputs from "../../components/ui/NewGoalInputs";
import colors from "../../constants/colors";
import SCLAlert from "../../lib/scl-alert/components/SCLAlert";
import SCLAlertButton from "../../lib/scl-alert/components/SCLAlertButton";
import GoalModel from "../../database/Models/GoalModel";
import StepModel from "../../database/Models/StepModel";
import TaskModel from "../../database/Models/TaskModel";
import {useDispatch, useSelector} from "react-redux";
import {loadStepsWithTasks} from "../../store/actions/updateactions";
import {loadGoal} from "../../store/actions/homedataactions";




export default props=>{
    const {goalData,stepsArray} = useSelector(store=>store.updatereducers);

    const [wants_to,set_wants_to] = React.useState('');
    const [steps,setSteps] = useState([]);


    const [done,setDone] = useState(false);
    const dispatch = useDispatch();

    const {specificGoal} = props.route.params;




    useEffect(()=>{
        setSteps([...stepsArray]);

        set_wants_to(goalData.wants_to)
    },[stepsArray]);


    const loadGoalData = useCallback(async ()=>{
        await dispatch(loadStepsWithTasks(specificGoal));
        },[dispatch]);

    useEffect(()=>{
        loadGoalData();
    },[loadGoalData])



    const stepObject = {
        id:0,
        heading:'',
        tasks:[]
    }

    const taskObject = {
        id:0,
        set_end_time:false,
        showDate:false,
        date:new Date(1598051730000),
        completed:false,
        task_name:'',

    }

    const generateSteps = ()=>{
        const id = steps.length > 0 ?  steps[steps.length-1].id : 1;
        stepObject.id = id+1;
        taskObject.id = 1;
        stepObject.tasks = [taskObject]
        setSteps([...steps,stepObject]);

    }

    const generateTask = (step)=>{
        taskObject.id = step.tasks.length > 0 ? step.tasks[step.tasks.length-1].id +1 : 1;
        step.tasks = [...step.tasks,taskObject];

        setSteps([...steps]);
    }

    const deleteStep = async id=>{
        const remainingSteps = steps.filter(step=>step.id !== id);
        await StepModel.deleteStep(id);
        await TaskModel.deleteTaskByStepId(id);
        setSteps([...remainingSteps]);
    }

    const deleteTask = async (step,id)=>{
        const remainingTasks = step.tasks.filter(task=>task.id !== id);
        step.tasks = remainingTasks;
        await TaskModel.deleteTask(id);
        setSteps([...steps]);
    }

    const onChangeStep = (step,name,text)=>{
        step[name] = text;
        setSteps([...steps]);
    }

    const onChangeTaskValue = (step,task,name,text)=>{
        task[name] = text;
        setSteps([...steps]);
    }

    const onChangeDate = (step,task,e,selectedDate)=>{
        task['set_end_time'] = true;
        task['showDate'] = false;
        onChangeTaskValue(step,task,'date',new Date(selectedDate).toISOString());
    }

    const updateGoalFun = async ()=>{
        if(steps.length > 0 && wants_to !== "") {

            await GoalModel.updateWantsTo(wants_to,specificGoal.id,steps.length);
           const stepsPromises = steps.map(async step=>{
               if(step.fromDb)
                   return await StepModel.updateStepHeadingById(step.heading,step.id,step.tasks.length)
               else
               {
                   return await StepModel.addSteps(step.heading,specificGoal.id,step.tasks.length);
               }
           });
            await Promise.all(stepsPromises);
           const overallPromise =  await steps.map(async step=>{
               const taskPromise = step.tasks.map(async task=>{
                   if(!task.set_end_time){
                       task.date = "";
                   }


                   if(task.fromDb) {
                       return await TaskModel.updateAllTasksById({...task}, task.id);
                   }else{


                         task.goal_id = specificGoal.id;
                         task.step_id = step.id;
                         return await TaskModel.insertNewRecord({...task})
                   }
               })

               return await Promise.all(taskPromise);

           })


            await Promise.all(overallPromise);

          setDone(true);
          dispatch(loadGoal());// to refresh the home page again



        }else{
            Alert.alert(AppText.error,AppText.heading_name_and_steps_are_required,[{text:AppText.ok}])
        }



    }


    return(
        <ScrollView keyboardShouldPersistTaps={"always"}>

            <View style={styles.container}>

                <SCLAlert
                    theme="success"
                    show={done}
                    title={AppText.done}
                    useNativeDrive={true}
                    onRequestClose={()=>setDone(false)}
                    subtitle={AppText.update_goal+" "+ AppText.successfully}
                >
                    <SCLAlertButton theme="success" onPress={()=>setDone(false)}>{AppText.ok}</SCLAlertButton>
                </SCLAlert>


                <HeadingText>{AppText.what_you_want_to_achieve}</HeadingText>
                <CustomText style={styles.item}>{AppText.wants_to}</CustomText>
                <Input value={wants_to} onChangeText={(text)=>set_wants_to(text)} style={{marginVertical:20,}} placeholder={AppText.wants_to_eg}/>

                <HeadingText>{AppText.divide_your_big_goal_into_small_steps}</HeadingText>
                <CustomText style={styles.item}>{AppText.it_is_preferable_to_divide_goal_into_small_many_steps}</CustomText>

                {
                    steps.map((step,i)=>(
                        <NewGoalInputs key={step.id}
                                       step={step}
                                       index={i}
                                       generateTask={generateTask}
                                       deleteStep={deleteStep}
                                       deleteTask={deleteTask}
                                       onChangeStep={onChangeStep}
                                       onChangeTaskValue={onChangeTaskValue}
                                       onChangeDate={onChangeDate}


                        />
                    ))
                }

                <Button
                    buttonStyle={{backgroundColor:colors.emerald,marginVertical:10}}
                    onPress={generateSteps}
                    title={AppText.generate_steps}
                />

                <Button
                    buttonStyle={{backgroundColor:colors.asphalt,marginVertical:10}}
                    onPress={updateGoalFun}
                    title={AppText.update_goal}
                />





            </View>



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
    },
    item:{
        marginVertical:10,
    }
});
