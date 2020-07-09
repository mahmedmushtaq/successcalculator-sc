import React, {useState} from "react";
import {ScrollView,View,StyleSheet,Dimensions} from "react-native";
import {CustomText} from "./Text";
import {Button, CheckBox, Overlay} from 'react-native-elements';
import {HeadingText} from "./HeadingText";
import {AppText} from "../../constants/text";
import { Entypo } from '@expo/vector-icons';
import colors from "../../constants/colors";
import {useSelector} from "react-redux";

const width = Dimensions.get("window").width;
const height = Dimensions.get('window').height;

export default props=>{
    const [checked,setChecked] = useState(false);

    return(
        <Overlay
            isVisible={props.isVisible}
            overlayStyle={{width:width-15,height:"45%"}}
            onBackdropPress={()=>props.setVisible(false)}
        >



                <View>
                    <View style={[styles.header,{marginBottom:20,}]}>
                        <HeadingText>{AppText.calculate_progress}</HeadingText>
                        <Entypo name="cross" size={24} color="black" onPress={()=>props.setVisible(false)}/>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bodyHeader}>
                            <HeadingText style={{textAlign:'center',fontSize:15,}}>
                                Goal Name -<CustomText style={{fontSize:9}}>{AppText.goal}</CustomText>
                            </HeadingText>

                            <HeadingText style={{textAlign:'center',fontSize:10,}}>
                                Step Name -<CustomText style={{fontSize:9}}>{AppText.step}</CustomText>
                            </HeadingText>


                            <HeadingText style={{marginTop:20,marginBottom:20,}}>
                                {AppText.have_you_completed_this_task}
                            </HeadingText>
                        </View>

                      <View>
                          <CheckBox
                              center
                              title={AppText.i_want_to_show_this_goal_progress_in_my_front_screen}
                              iconRight
                              containerStyle={styles.checkboxStyle}
                              checkedIcon='dot-circle-o'
                              uncheckedIcon='circle-o'
                              checkedColor='red'

                              checked={checked}
                              onPress={()=>setChecked(!checked)}
                          />
                          <CustomText style={{fontSize:10,color:colors.belize_hole,marginLeft:19,}}>date time</CustomText>

                      </View>


                        <View style={styles.bodyFooter}>

                            <Button buttonStyle={{backgroundColor:colors.asphalt}} title={AppText.done}/>
                        </View>



                    </View>

                </View>





        </Overlay>
    )
}

const styles = StyleSheet.create({
     item:{
         marginVertical:10,
     },
    header:{
         flexDirection:'row',
         justifyContent:'space-between'
    },
    checkboxStyle:{
        padding:5,backgroundColor:'transparent',color:'white',borderTopWidth:0,borderLeftWidth:0,borderRightWidth:0,
    },
    bodyFooter:{
         marginTop:'auto',

    },
    body:{
       justifyContent: 'flex-end'
    }
});



