import React from "react";
import {View,StyleSheet,Dimensions} from "react-native";
import {CustomText} from "./Text";
import {HeadingText} from "./HeadingText";
import colors from "../../constants/colors";

const width = Dimensions.get("window").width;

export default props=>{
    return(
        <View style={{marginVertical:5,}}>
           <View style={styles.date_txt_holder}>
               <View style={{...styles.textHolder,...{backgroundColor:colors.primary,}}}>
                   <HeadingText style={{fontSize:8,color:'white'}}>Month</HeadingText>
                   <CustomText style={{color:'white'}}>25</CustomText>
               </View>
               <View style={styles.taskHolder}>
                   <HeadingText style={{color:'white'}}>Task name</HeadingText>
                   <CustomText style={{color:'white',fontSize:10,}}>It will help you to achieve step name</CustomText>
               </View>

           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    date_txt_holder:{
        flexDirection:'row',
    },
    textHolder:{
        width:45,
        height:45,
        padding:5,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    },
    taskHolder:{
        marginHorizontal:3,
        backgroundColor:colors.primary,
        width:'86%',
        paddingHorizontal:10,
        paddingTop:2,
        paddingBottom:15,
        borderRadius:6,
    }

});

