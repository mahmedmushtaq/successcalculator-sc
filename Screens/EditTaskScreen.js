import React, {useEffect, useState} from "react";
import {View,StyleSheet} from "react-native";
import {HeadingText} from "../components/ui/HeadingText";
import {CustomText as Text} from "../components/ui/Text";
import {AppText} from "../constants/text";
import {Button, Input} from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../constants/colors";
import {useDispatch} from "react-redux";
import {updateTask} from "../store/actions/homedataactions";


export default props=>{
    const {task} = props.route.params;
    const [visible,setVisible] = useState(false);
    const [date,setDate] = useState(new Date());
    const [endDateTime,setEndDateTime] = useState(new Date());

    const [taskName,setTaskName] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{

        setEndDateTime(task.end_time);

        setTaskName(task.task_name);

    },[task]);

    const updateEditTask = async ()=>{
        await dispatch(updateTask({
            ...task,
            date:endDateTime,
            task_name:taskName,
        }))
    }

    return(
        <View style={{padding:20,}}>
            <Input value={taskName} onChangeText={text => {setTaskName(text)}}  style={{...styles.item}} placeholder={AppText.task}/>
            <Text style={{fontSize:10,}}>{AppText.when_you_will_complete_this_or_have_no_idea}</Text>
            <Input value={endDateTime.toString()} />
            <Button style={{...styles.item}}
                    title={AppText.set_date}
                    buttonStyle={{backgroundColor:colors.primary,width:200,marginHorizontal:20,}}
                    onPress={()=>{setVisible(true)}}/>

            {visible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={(e,selectedDate)=>{
                        //  console.log("selected date = ",new Date(selectedDate).toISOString())
                        setVisible(false);
                        const dateTime = new Date(selectedDate).toISOString();
                        setDate(selectedDate)

                        setEndDateTime(dateTime);
                        // setDate(selectedDate);
                        // setDate(selectedDate);


                    }}

                />
            )}


            <Button buttonStyle={{backgroundColor:colors.asphalt,marginVertical:20,}} onPress={()=>{updateEditTask()}} title={AppText.update_task}/>

        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        marginVertical:10,
    }
})
