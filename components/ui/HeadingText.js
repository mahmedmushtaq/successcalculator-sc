import React from "react";
import {Text,StyleSheet} from "react-native";

export const HeadingText =  props=>{
    const propsStyle = props.style || {};
    return(
        <Text style={{...styles.textStyle,...propsStyle}}>
            {props.children}
        </Text>
    )
}



const styles = StyleSheet.create({
    textStyle:{
        fontFamily:'fredokaOne',
        fontSize:20,
    }
})
