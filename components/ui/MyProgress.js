import React, {useCallback, useEffect, useState} from "react";
import {View,StyleSheet,Dimensions} from "react-native";
import colors from "../../constants/colors";
import GoalModel from "../../database/Models/GoalModel";
import {HeadingText} from "./HeadingText";
import {AppText} from "../../constants/text";
import {CustomText} from "./Text";
import { Slider } from 'react-native-elements';
import Card from "./Card";
import {Button} from "react-native-elements";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default props=>{
    const [goal,setGoal] = useState({});
    const [progressValue,setProgressValue] = useState(.2);
    const loadGoal = useCallback(async()=>{

        const goalData = await GoalModel.selectParticularGoal({
            onlyLastRecord:true,
            completed:false,
        }).catch(err=>{
            console.log("err = ",err);
        })



        console.log("goal data is = ",goalData);
        setGoal(goalData);

    },[])

    useEffect(()=>{
        loadGoal();
    },[loadGoal])

    const opacity = .2;

    return(


        <View style={styles.root}>
            <Button buttonStyle={{...{backgroundColor:colors.asphalt},...styles.item}} title={AppText.check_my_progress}/>
        <Card style={styles.container}>

                <HeadingText style={{color:'white'}}>{AppText.my_progress}</HeadingText>
                <CustomText style={styles.item}>Wants to</CustomText>
                <View style={{ flex: 1,marginVertical:5, alignItems: 'stretch', justifyContent: 'center' }}>
                    <Slider
                        value={progressValue}
                        onValueChange={(value) => {}}
                        disabled
                        maximumTrackTintColor={'white'}
                        minimumTrackTintColor={colors.asphalt}


                    />

                </View>
                <CustomText style={styles.item}>progress: {progressValue * 100}%</CustomText>




        </Card>

            <HeadingText style={{...styles.item,...{color:'black'}}}>{AppText.tasks}</HeadingText>
        </View>


    )
}

const styles = StyleSheet.create({
    root:{
        marginVertical: 2,
    },
    container:{
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:20,
        color:'white',
        backgroundColor:colors.primary,
        borderRadius:5,

    },
    item:{
        marginVertical:2,
        color:'white'
    }
});

