import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, View, StyleSheet, Dimensions, FlatList} from "react-native";
import {CustomText} from "../Text";
import {Button, CheckBox, Overlay} from 'react-native-elements';
import {HeadingText} from "../HeadingText";
import {AppText} from "../../../constants/text";
import {loadAllGoals} from "../../../store/actions/goalsettings";
import colors from "../../../constants/colors";
import {loadStepsWithTasks} from "../../../store/actions/updateactions";
import GoalModel from "../../../database/Models/GoalModel";
import TaskCheckBoxItem from "../TaskCheckBoxItem";
import {useDispatch} from "react-redux";
import {loadGoal} from "../../../store/actions/homedataactions";
import { Entypo } from '@expo/vector-icons';

const width = Dimensions.get("window").width;
const height = Dimensions.get('window').height;

export default props=>{
    const {refreshPC,setRefreshPC} = props;
    const [goalsArray,setAllGoalsArray] = useState([]);
    const dispatch = useDispatch();


    const loadAllTasks = useCallback(async ()=>{
       const allGoals = await loadAllGoals(false)();
       const goalsArrayPromise = allGoals.map(async goal=>{
            const stepsArray = await loadStepsWithTasks(goal,false)();

            return {
                ...goal,
                steps:stepsArray,
            }
       })

        const goalsArrayLocal = await Promise.all(goalsArrayPromise);



       setAllGoalsArray(goalsArrayLocal);
       setRefreshPC(false);

    },[refreshPC]);

    useEffect(()=>{
        loadAllTasks();
    },[loadAllTasks])

    const saveProgress = async ()=>{
        props.setVisible(false);
        await dispatch(loadGoal());

    }



    return(
        <Overlay
            isVisible={props.isVisible}
            fullScreen

            overlayStyle={{backgroundColor:'red'}}
            onBackdropPress={()=>props.setVisible(false)}
        >



            <View >

                <View style={styles.pcHeader}>
                    <HeadingText style={{color:'white'}}>{AppText.progress_calculator}</HeadingText>
                    <Entypo name="cross" size={24} color="white" onPress={()=>props.setVisible(false)} />
                </View>

                <FlatList keyExtractor={(item => item.id.toString())} data={goalsArray} renderItem={({item:goalItem})=>(
                    <View style={styles.item} >
                        <HeadingText style={{...styles.textStyle,fontSize:20,}}>
                            {goalItem.wants_to} <CustomText style={styles.smallHintText}>{AppText.goal}</CustomText>
                        </HeadingText>
                        <FlatList keyExtractor={(item=>item.id.toString())} data={goalItem.steps} renderItem={({item:stepItem})=>(
                            <View style={styles.item}>
                                <CustomText style={{...styles.textStyle,fontSize:18,}}>
                                    {stepItem.heading} <CustomText style={styles.smallHintText}>{AppText.step}</CustomText>
                                </CustomText>


                                <FlatList keyExtractor={(item1 => item1.id.toString())} data={stepItem.tasks} renderItem={({item})=>(
                                   <TaskCheckBoxItem item={item} goalData={goalItem} stepData={stepItem} refreshTasks={loadAllTasks}/>
                                )}/>

                            </View>
                        )}/>



                    </View>
                )}/>




                <Button buttonStyle={styles.saveBtnStyle} onPress={saveProgress} titleStyle={{color:colors.asphalt}} title={AppText.done}/>


            </View>


        </Overlay>
    )
}

const styles = StyleSheet.create({
     item:{
         marginVertical:10,
     },

    // overlayStyle:{
    //     width:width/1.5,
    //     height:"65%",
    //     color:'white',
    //
    //     backgroundColor:colors.primary
    // },
    overlayStyle:{
      backgroundColor:colors.primary,
      paddingHorizontal:10,
      paddingVertical:20,
    },

    textStyle:{
         paddingLeft:10,
         fontSize:10,

         color:'white',
    },
    smallHintText:{
         fontSize:6,
    },
    saveBtnStyle:{
        backgroundColor:'white',
        marginTop:'auto',
        alignItems:'flex-end'
    },
    pcHeader:{
         flexDirection:'row',
        justifyContent:'space-between',
    }

});



