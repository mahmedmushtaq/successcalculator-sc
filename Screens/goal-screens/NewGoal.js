import React, {useState} from "react";
import {View, StyleSheet, ScrollView, Alert} from "react-native";
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
import {useDispatch} from "react-redux";
import {loadGoal} from "../../store/actions/homedataactions";
import {getStorageData} from "../../constants/others";
import ScrollContentViewNativeComponent
    from "react-native/Libraries/Components/ScrollView/ScrollContentViewNativeComponent";



export default props=>{
   const [wants_to,set_wants_to] = React.useState('');
   const [steps,setSteps] = useState([]);
   const [done,setDone] = useState(false);
   const dispatch = useDispatch();
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

   const deleteStep = id=>{
       const remainingSteps = steps.filter(step=>step.id !== id);
       setSteps([...remainingSteps]);
   }

   const deleteTask = (step,id)=>{
       const remainingTasks = step.tasks.filter(task=>task.id !== id);
       step.tasks = remainingTasks;
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

   const addNewGoal = async ()=>{
     if(steps.length > 0 && wants_to !== "") {

          const newGoal = await GoalModel.setNewGoal(wants_to,steps.length);

         const promises =  steps.map(async step=> await StepModel.addSteps(step.heading,newGoal.insertId,step.tasks.length))
         const allStepsInsertData = await Promise.all(promises);

         const tasksArray = [];
        //
        allStepsInsertData.map(async (singleStepData,i)=>{
             const tasks = steps[i].tasks;
             return tasks.map(async (task,index)=>{
                 if(!task.set_end_time){
                     task.date = '';
                 }
                 task.step_id = singleStepData.insertId;
                 task.goal_id = newGoal.insertId;
                 return tasksArray.push(task);

             })


         })

         const res =  await TaskModel.addTasks(tasksArray)

         set_wants_to('');
         setSteps([]);
         const check = await getStorageData();
         dispatch(loadGoal(check))
         setDone(true);


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
                       subtitle={AppText.new_goal_added_successfully}
                   >
                       <SCLAlertButton theme="success" onPress={()=>setDone(false)}>{AppText.ok}</SCLAlertButton>
                   </SCLAlert>


                   <HeadingText>{AppText.what_you_want_to_achieve}</HeadingText>
                   <CustomText style={styles.item}>{AppText.wants_to}</CustomText>
                   <Input onChangeText={(text)=>set_wants_to(text)} style={{marginVertical:20,}} placeholder={AppText.wants_to_eg}/>

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
                       onPress={addNewGoal}
                       title={AppText.set_new_goal}
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
