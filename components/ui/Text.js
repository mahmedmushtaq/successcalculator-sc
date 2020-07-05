import React from "react";
import {Text,StyleSheet} from "react-native";

export const CustomText =  props=>{
    const propsStyle = props.style || {};
    return(
        <Text style={{...styles.textStyle,...propsStyle}}>
            {props.children}
        </Text>
    )
}



const styles = StyleSheet.create({
    textStyle:{
        fontFamily:'raleway',
        fontSize:15,
    }
})
