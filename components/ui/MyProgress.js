import React, {useCallback, useEffect, useState} from "react";
import {View,StyleSheet,Dimensions,TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import colors from "../../constants/colors";
import {HeadingText} from "./HeadingText";
import {AppText} from "../../constants/text";
import {CustomText} from "./Text";
import { Slider } from 'react-native-elements';
import Card from "./Card";
import {Button} from "react-native-elements";
import ProgressCalculator from "./ProgressCalculator";
import {Feather } from '@expo/vector-icons';


const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default props=>{

    const {goal,completedTasks,tasks} = props;
    console.log("completed tasks ",completedTasks," tasks = ",tasks);

    const [progressValue,setProgressValue] = useState( tasks.length > 0 ? completedTasks.length/tasks.length :0);
    const [isVisible,setVisible] = useState(false);
    const navigation = useNavigation();










    const opacity = .2;
    const Touchable = TouchableOpacity;

    return(


        <View style={styles.root}>
            <ProgressCalculator isVisible={isVisible} setVisible={setVisible}/>

            <Button buttonStyle={{...{backgroundColor:colors.asphalt},...styles.item}}
                    title={AppText.check_my_progress}
                    onPress={()=>setVisible(true)}
            />

                <Card style={styles.container}>

                        <HeadingText style={{color:'white'}}>{AppText.my_progress}</HeadingText>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <CustomText style={styles.item}>{goal.wants_to}</CustomText>
                            <Feather name="edit-2" size={20} color="black" onPress={()=>navigation.navigate(AppText.goal_settings)} />
                        </View>
                        <View style={{ flex: 1,marginVertical:5, alignItems: 'stretch', justifyContent: 'center' }}>
                            <Slider
                                value={progressValue}
                                onValueChange={(value) => {}}
                                disabled
                                maximumTrackTintColor={'white'}
                                minimumTrackTintColor={colors.asphalt}


                            />

                        </View>


                        <CustomText style={styles.item}>{AppText.progress}: {progressValue * 100}%</CustomText>







                </Card>

            <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,}}>
                 <HeadingText style={{...styles.item,...{color:'black'}}}>{AppText.tasks}</HeadingText>

             </View>
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

