import React, {useState} from "react";
import {View,StyleSheet,Dimensions,TouchableOpacity} from "react-native";
import {CustomText} from "./Text";
import {HeadingText} from "./HeadingText";
import colors from "../../constants/colors";
import moment from "moment";
import {Button, Overlay} from "react-native-elements";
import {AppText} from "../../constants/text";
import {useDispatch} from "react-redux";
import {deleteParticularTask} from "../../store/actions/homedataactions";
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get("window").width;

export default props=>{
    const {task} = props;

   const months = [ "Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];

   const dispatch = useDispatch();
   const navigation = useNavigation();

   const [visible,setVisible] = useState(false);

    let dayDate = '';
    let monthDate = '';
    if(task.end_time) {
        dayDate = new moment(new Date(task.end_time)).format("DD");
        monthDate = new moment(new Date(task.end_time)).format("MMM");

    }



    const editTask = async ()=>{
        setVisible(false);
          navigation.navigate(AppText.edit_task_screen,{
              task,
          })
    }

    const deleteTask = async ()=>{
        setVisible(false);
        await dispatch(deleteParticularTask(task.id));
    }





    return(
        <View style={{marginVertical:5,}}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Overlay
                    isVisible={visible}
                    onBackdropPress={()=>setVisible(false)}
                >
                    <View>

                        <HeadingText>{task.task_name}</HeadingText>
                        <Button buttonStyle={{backgroundColor:colors.primary,margin:5,}} title={AppText.edit} onPress={()=>editTask()}/>
                        <Button buttonStyle={{backgroundColor:colors.asphalt,margin:5,}} title={AppText.delete} onPress={()=>deleteTask()}/>
                    </View>
                </Overlay>
            </View>


          <TouchableOpacity activeOpacity={.9} onLongPress={()=>setVisible(true)}>
              <View style={styles.date_txt_holder}>
                  <View style={{...styles.textHolder,...{backgroundColor:task.selectedColor,}}}>
                      <HeadingText style={{fontSize:8,color:'white'}}>{task.end_time ? monthDate : 'No End'}</HeadingText>
                      <CustomText style={{color:'white'}}>{task.end_time ? dayDate: 'time'}</CustomText>
                  </View>
                  <View style={[styles.taskHolder,{backgroundColor:task.selectedColor}]}>
                      <HeadingText style={{color:'white'}}>{task.task_name}</HeadingText>
                      <CustomText style={{color:'white',fontSize:10,}}>It will help you to achieve <HeadingText style={{fontSize:13,}}>{task.step.heading}</HeadingText></CustomText>
                  </View>

              </View>
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    date_txt_holder:{
        flexDirection:'row',
    },
    textHolder:{
        width:45,
        height:45,
        padding:5,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    },
    taskHolder:{
        marginHorizontal:3,

        width:'86%',
        paddingHorizontal:10,
        paddingTop:2,
        paddingBottom:15,
        borderRadius:6,
    }

});

