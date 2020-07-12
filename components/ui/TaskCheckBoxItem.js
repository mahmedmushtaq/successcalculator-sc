import React from "react";
import {StyleSheet, View} from "react-native";
import {CheckBox} from "react-native-elements";
import colors from "../../constants/colors";
import {CustomText} from "./Text";
import TaskModel from "../../database/Models/TaskModel";
import moment from "moment";
import {AppText} from "../../constants/text";


export default props=>{
    const {item,goalData,stepData,refreshTasks} = props;

    const taskCompleted = async ()=>{
        await TaskModel.taskCompleted(goalData,stepData,item.id);
       await refreshTasks();
    }

    let dayDate = '';
    let monthDate = '';
    if(item.end_time) {
        dayDate = new moment(new Date(item.end_time)).format("DD");
        monthDate = new moment(new Date(item.end_time)).format("MMM");

    }


    return(
        <View>
            <CheckBox
                center
                title={item.task_name}
                iconRight

                textStyle={{color:'white',fontSize:12,}}

                containerStyle={{padding: 5, fontSize: 12,backgroundColor:colors.primary,border:'none'}}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={item.completed === 'false'}
                onPress={taskCompleted}
                checkedColor='white'

            />
            <CustomText style={styles.textStyle}>{item.end_time ? monthDate+"/"+dayDate : AppText.no_end +" "+ AppText.time}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({

    textStyle:{
        paddingLeft:10,
        fontSize:10,

        color:'white',
    }
});
