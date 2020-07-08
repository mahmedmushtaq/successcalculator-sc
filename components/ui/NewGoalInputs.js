import React from "react";
import {Button, Input} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import {CustomText as Text} from "./Text";
import {AppText} from "../../constants/text";
import colors from "../../constants/colors";
import {Entypo} from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

export default props=>{
    const {
        step,
        index:i,
        onChangeStep,
        onChangeTaskValue,
        onChangeDate,

        deleteTask,
        generateTask,
        deleteStep,
    } = props;

    return(
        <View style={styles.stepContainer}  >
            <View>
                <Text style={styles.dot}>{i+1}</Text>
            </View>
            <View style={styles.stepView}>
                <Input value={step.heading} onChangeText={text=>onChangeStep(step,'heading',text)}  style={styles.stepInput} placeholder={AppText.step_heading}/>

                {
                    step.tasks.map((task,i)=>(
                        <View key={task.id} style={styles.stepContainer}>
                            <View>
                                <Text style={styles.dot}>{i+1}</Text>
                            </View>
                            <View style={styles.item}>
                                <Input value={task.task_name} onChangeText={text => onChangeTaskValue(step,task,'task_name',text)}  style={{...styles.stepInput}} placeholder={AppText.task}/>
                                <Text style={{fontSize:10,}}>{AppText.when_you_will_complete_this_or_have_no_idea}</Text>
                                <Input value={task.set_end_time ? task.date.toString() : ''} />
                                <Button title={AppText.set_date}  buttonStyle={{backgroundColor:colors.primary,width:200,marginHorizontal:20,}} onPress={()=>{
                                    props.onChangeTaskValue(step,task,'showDate',true);
                                }}/>

                                {task.showDate && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={task.date}
                                        mode={"date"}
                                        is24Hour={true}
                                        display="default"
                                        onChange={(e,selectedDate)=>onChangeDate(step,task,e,selectedDate)}

                                    />
                                )}
                            </View>







                            <View>
                                {
                                    i > 0 && (     <Entypo onPress={()=>deleteTask(step,task.id)} name="cross"  style={styles.dot} size={20} color="black" />
                                    )
                                }
                            </View>
                        </View>
                    ))
                }
                <Button  title={AppText.generate_tasks} onPress={()=>generateTask(step)}  />
            </View>
            <View>
                <Entypo name="cross" onPress={()=>deleteStep(step.id)} style={styles.dot} size={20} color="black" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepInput:{
        marginVertical:10,

    },
    stepView:{
        marginLeft:4,
        width:'90%',
    },
    item:{
        marginVertical: 10,
    },
    dot:{
        marginTop:15,
    },

    stepContainer:{
        flexDirection:'row',
        alignItems:'flex-start',
        marginVertical:10,
    },
});
