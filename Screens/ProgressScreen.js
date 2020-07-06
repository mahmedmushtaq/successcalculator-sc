import React, {useState} from "react";
import {View,StyleSheet} from "react-native";
import {CustomText} from "../components/ui/Text";
import {HeadingText} from "../components/ui/HeadingText";
import {CheckBox} from "react-native-elements";
import {AppText} from "../constants/text";


export default props=>{
    const [checked,setChecked] = useState(false);
    return(
        <View style={{padding:10,}}>
            <View>
                <HeadingText>Goal Name</HeadingText>

                <CheckBox
                    center
                    title={AppText.i_want_to_show_this_goal_progress_in_my_front_screen}
                    iconRight
                    containerStyle={{padding:5,}}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checkedColor='red'
                    checked={checked}
                    onPress={()=>setChecked(!checked)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

});
