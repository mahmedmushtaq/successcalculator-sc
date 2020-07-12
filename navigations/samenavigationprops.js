import {Entypo} from "@expo/vector-icons";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {AppText} from "../constants/text";

const imageAsset = require("../assets/custom_icons/add.png");

const headerLeft =(props)=>( {
    headerLeft:()=>(
        <Entypo name="menu" size={24} color="black" onPress={()=>props.navigation.openDrawer()} />

    ),
    headerTitleContainerStyle:{
        left:50,
    },
    headerLeftContainerStyle:{
        left:10,
    }
})



const headerRight =(props)=>( {
    headerRight:()=>(
        <TouchableOpacity activeOpacity={.2} onPress={()=>props.navigation.navigate(AppText.add_new_goal)}>
            <Image style={{...styles.headerRightStyle}} source={imageAsset} />
        </TouchableOpacity>
    ),


})
const headerTitleStyle = {
    headerTitleStyle:{
        fontFamily:'fredokaOne'
    }
}

const styles = StyleSheet.create({
    headerRightStyle:{
        width: 30, height: 30,marginRight:10,
    }
})



export {headerLeft,headerTitleStyle,headerRight,imageAsset}
