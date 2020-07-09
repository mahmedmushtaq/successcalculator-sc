import React from "react";
import {StyleSheet, View} from "react-native";
import {CheckBox} from "react-native-elements";
import colors from "../../constants/colors";
import {CustomText} from "./Text";


export default props=>{
    const {item} = props;
    return(
        <View>
            <CheckBox
                center
                title={item.task_name}
                iconRight

                textStyle={{color:'white',fontSize:12,}}

                containerStyle={{padding: 5, fontSize: 12,backgroundColor:colors.primary,border:'none'}}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={item.completed === 'false'}
                onPress={()=>{}}
                checkedColor='white'

            />
            <CustomText style={styles.textStyle}>Date time</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({

    textStyle:{
        paddingLeft:10,
        fontSize:10,

        color:'white',
    }
});
