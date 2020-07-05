import React, {useState} from "react";
import {View,StyleSheet,ScrollView,KeyboardAvoidingView} from "react-native";
import {HeadingText} from "../components/ui/HeadingText";
import {AppText} from "../constants/text";
import {CustomText} from "../components/ui/Text";
import {Input,Button} from "react-native-elements";
import NewGoalInputs from "../components/ui/NewGoalInputs";
import colors from "../constants/colors";



export default props=>{
   const [wants_to,set_wants_to] = React.useState('');
   const [steps,setSteps] = useState([]);
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
       onChangeTaskValue(step,task,'date',selectedDate);
   }

   const addNewGoal = ()=>{
       console.log("add new goal",wants_to," steps = ",steps);
   }


    return(
        <ScrollView>

               <View style={styles.container}>
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
