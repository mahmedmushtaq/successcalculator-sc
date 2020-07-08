import react, {useEffect, useState} from "react";
import {View,StyleSheet} from "react-native";
import {HeadingText} from "../components/ui/HeadingText";
import {CustomText as Text} from "../components/ui/Text";
import {AppText} from "../constants/text";
import {Button, Input} from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../constants/colors";


export default props=>{
    const {specificTask:task} = props.route.params;
    const [visible,setVisible] = useState(false);
    const [date,setDate] = useState('');
    const [taskName,setTaskName] = useState('');

    useEffect(()=>{
        setDate(task.date);
        setTaskName(task.task_name);

    },[task]);

    return(
        <View>
            <Input value={taskName} onChangeText={text => {setTaskName(text)}}  style={{...styles.item}} placeholder={AppText.task}/>
            <Text style={{fontSize:10,}}>{AppText.when_you_will_complete_this_or_have_no_idea}</Text>
            <Input value={date ? date.toString() : ''} />
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
                        setDate(new Date(selectedDate).toISOString());
                    }}

                />
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        marginVertical:10,
    }
})
