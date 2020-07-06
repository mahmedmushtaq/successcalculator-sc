import React, {useState} from "react";
import {View,Picker,StyleSheet} from "react-native";
import {CustomText} from "../components/ui/Text";
import {AppText} from "../constants/text";
import {HeadingText} from "../components/ui/HeadingText";


export default props=>{
    const [pickerValue,setPickerValue] = useState('');
    return(
        <View>
            <View style={[styles.item,{justifyContent:'center',alignItems:'center'}]}>
                <CustomText>Select</CustomText>
                <Picker
                    selectedValue={pickerValue}
                    onValueChange={hand => setPickerValue(hand)}
                    style={{ width: 160 }}
                    mode="dropdown">
                    <Picker.Item label={AppText.goals} value="goals" />
                    <Picker.Item label={AppText.steps} value="steps" />
                    <Picker.Item label={AppText.tasks} value="tasks" />
                </Picker>
            </View>
            <View style={[styles.item,{marginHorizontal:10,}]}>
                <HeadingText>Goal Name</HeadingText>
                <CustomText>Achieved At</CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
     item:{
         marginVertical:10,
     }
});
