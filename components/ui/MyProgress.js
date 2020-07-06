import React, {useCallback, useEffect, useState} from "react";
import {View,StyleSheet,Dimensions,TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import colors from "../../constants/colors";
import GoalModel from "../../database/Models/GoalModel";
import {HeadingText} from "./HeadingText";
import {AppText} from "../../constants/text";
import {CustomText} from "./Text";
import { Slider } from 'react-native-elements';
import Card from "./Card";
import {Button} from "react-native-elements";
import ProgressCalculator from "./ProgressCalculator";


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default props=>{
    const [goal,setGoal] = useState({});
    const [progressValue,setProgressValue] = useState(.2);
    const [isVisible,setVisible] = useState(false);
    const navigation = useNavigation();
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
    const Touchable = TouchableOpacity;

    return(


        <View style={styles.root}>
            <ProgressCalculator isVisible={isVisible} setVisible={setVisible}/>

            <Button buttonStyle={{...{backgroundColor:colors.asphalt},...styles.item}}
                    title={AppText.check_my_progress}
                    onPress={()=>setVisible(true)}
            />
            <Touchable activeOpacity={.9} onPress={()=>navigation.navigate(AppText.my_progress)}>
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
            </Touchable>

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
        backgroundColor:colors.emerald,
        borderRadius:5,

    },
    item:{
        marginVertical:2,
        color:'white'
    }
});

