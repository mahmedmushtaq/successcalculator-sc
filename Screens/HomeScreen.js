import React from "react";
import {View,Text,StyleSheet} from "react-native";
import colors from "../constants/colors";
import { Button } from 'react-native-elements';
import {AppText} from "../constants/text";
import MyProgress from "../components/ui/MyProgress";
import {HeadingText} from "../components/ui/HeadingText";
import TaskItem from "../components/ui/TaskItem";

export default props=>{

    return(
        <View style={styles.container}>
            <MyProgress/>


            <TaskItem/>


            <View style={styles.newGoals}>
                <Button  buttonStyle={styles.newGoalsBtn} title={AppText.add_new_goal} onPress={()=>props.navigation.navigate("Add New Goal")} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      position:'relative',
      flex:1,
      padding:5,
    },

    newGoals:{
        position: 'absolute',
        right:30,
        bottom:30,
        backgroundColor:colors.primary,

    },

    newGoalsBtn:{
        paddingHorizontal:30,
        paddingVertical:15,
        backgroundColor:colors.primary
    },
    item:{
        marginVertical:10,
    }
});


