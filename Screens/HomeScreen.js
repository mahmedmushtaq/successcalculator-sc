import React from "react";
import {View,Text,StyleSheet} from "react-native";
import colors from "../constants/colors";
import { Button } from 'react-native-elements';
import {AppText} from "../constants/text";

export default props=>{

    return(
        <View style={style.container}>
            <Text>Hello </Text>

            <View style={style.newGoals}>
                <Button  buttonStyle={style.newGoalsBtn} title={AppText.add_new_goal} onPress={()=>props.navigation.navigate("Add New Goal")} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
      position:'relative',
      flex:1,
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
    }
});


