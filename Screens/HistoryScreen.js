import React, {useState} from "react";
import {View, Picker, StyleSheet, FlatList} from "react-native";
import {CustomText} from "../components/ui/Text";
import {AppText} from "../constants/text";
import {HeadingText} from "../components/ui/HeadingText";
import GoalModel from "../database/Models/GoalModel";
import moment from "moment";
import TaskModel from "../database/Models/TaskModel";
import StepModel from "../database/Models/StepModel";


export default props=>{
    const [pickerValue,setPickerValue] = useState('');
    const [value,setValue] = useState([]);

    const loadCompletedGoals = async ()=>{
        const result = await GoalModel.getGoals({completed:'yes'});
        const newArray = result.rows._array.map(item=>{

            return{
                id:item.id,
                title:item.wants_to,
                achieved_at: moment(item.ended).format('YYYY-MM-DD HH:mm:ss')
            }
        })
        setPickerValue('goals');
        setValue(newArray);

    }

    const loadCompletedTasks = async  ()=>{

        const result = await TaskModel.getAllTasks('yes');


        const newArray = result.rows._array.map(item=>{

            return{
                id:item.id,
                title:item.task_name,
                achieved_at: moment(item.ended).format('YYYY-MM-DD HH:mm:ss')
            }
        })

        setPickerValue('tasks');
        setValue(newArray);

    }

    const loadCompletedSteps = async ()=>{
        const result = await StepModel.getAllCompletedSteps();


        const newArray = result.rows._array.map(item=>{

            return{
                id:item.id,
                title:item.heading,
                achieved_at: moment(item.ended).format('YYYY-MM-DD HH:mm:ss')
            }
        })
        setPickerValue('steps');

        setValue(newArray);

    }

    const pickerValueFun = async value=>{
        if(value === 'goals'){
            await loadCompletedGoals();
        }else if(value === 'tasks'){
            await loadCompletedTasks();
        }else{
            await loadCompletedSteps();
        }

    }

    return(
        <View>
            <View style={[styles.item,{justifyContent:'center',alignItems:'center'}]}>
                <CustomText>Select</CustomText>
                <Picker
                    selectedValue={pickerValue}
                    onValueChange={hand => pickerValueFun(hand)}
                    style={{ width: 160 }}
                    mode="dropdown">
                    <Picker.Item label={AppText.goals} value="goals" />
                    <Picker.Item label={AppText.steps} value="steps" />
                    <Picker.Item label={AppText.tasks} value="tasks" />
                </Picker>
            </View>
        {/*   here*/}
           <FlatList data={value} keyExtractor={item => item.id.toString()} renderItem={({item})=>(
               <View style={[styles.item,{marginHorizontal:10,}]}>
                   <HeadingText>{item.title}</HeadingText>
                   <CustomText>{item.achieved_at}</CustomText>
               </View>
           )}/>

        </View>
    )
}



const styles = StyleSheet.create({
     item:{
         marginVertical:10,
     }
});
