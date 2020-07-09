import React, {useCallback, useEffect, useState} from "react";
import {ScrollView, View, StyleSheet, Dimensions, FlatList} from "react-native";
import {CustomText} from "./Text";
import {Button, CheckBox, Overlay} from 'react-native-elements';
import {HeadingText} from "./HeadingText";
import {AppText} from "../../constants/text";
import {loadAllGoals} from "../../store/actions/goalsettings";
import colors from "../../constants/colors";
import {loadStepsWithTasks} from "../../store/actions/updateactions";
import GoalModel from "../../database/Models/GoalModel";
import TaskCheckBoxItem from "./TaskCheckBoxItem";

const width = Dimensions.get("window").width;
const height = Dimensions.get('window').height;

export default props=>{
    const [checked,setChecked] = useState(false);
    const [goalsArray,setAllGoalsArray] = useState([]);

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

    },[])

    useEffect(()=>{
        loadAllTasks();
    },[loadAllTasks])



    return(
        <Overlay
            isVisible={props.isVisible}
            overlayStyle={{...styles.overlayStyle,  paddingBottom: goalsArray.length > 0 ? 70 : undefined}}
            onBackdropPress={()=>props.setVisible(false)}
        >



            <View >

                <HeadingText style={{color:'white'}}>{AppText.progress_calculator}</HeadingText>

                <FlatList keyExtractor={(item => item.id.toString())} data={goalsArray} renderItem={({item})=>(
                    <View style={styles.item} >
                        <HeadingText style={{...styles.textStyle,fontSize:16,}}>
                            {item.wants_to} <CustomText style={styles.smallHintText}>{AppText.goal}</CustomText>
                        </HeadingText>
                        <FlatList keyExtractor={(item=>item.id.toString())} data={item.steps} renderItem={({item})=>(
                            <View>
                                <CustomText style={{...styles.textStyle,fontSize:13,}}>
                                    {item.heading} <CustomText style={styles.smallHintText}>{AppText.step}</CustomText>
                                </CustomText>


                                <FlatList keyExtractor={(item1 => item1.id.toString())} data={item.tasks} renderItem={({item})=>(
                                   <TaskCheckBoxItem item={item}/>
                                )}/>

                            </View>
                        )}/>



                    </View>
                )}/>




                <Button buttonStyle={{backgroundColor:'white',marginTop:'auto',alignItems:'flex-end'}} titleStyle={{color:colors.asphalt}} title={AppText.done}/>


            </View>


        </Overlay>
    )
}

const styles = StyleSheet.create({
     item:{
         marginVertical:10,
     },

    overlayStyle:{
        width:width/1.5,
        height:"45%",
        color:'white',

        backgroundColor:colors.primary
    },
    textStyle:{
         paddingLeft:10,
         fontSize:10,

         color:'white',
    },
    smallHintText:{
         fontSize:6,
    }
});



