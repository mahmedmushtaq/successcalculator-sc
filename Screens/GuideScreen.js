import React from "react";
import {View,StyleSheet,ScrollView} from "react-native";
import {CustomText} from "../components/ui/Text";
import {HeadingText} from "../components/ui/HeadingText";
import {AppText} from "../constants/text";

export default props=>{

    const guides = [
        {
            id:1,
            title:AppText.how_i_calculate_my_success,
            text:AppText.success_calculate_guide
        },
        {
            id:2,
            title:AppText.how_to_add_new_goal,
            text:AppText.press_plus_button
        },

        {
            id:3,
            title:AppText.how_to_check_my_daily_progress,
            text:AppText.daily_progress
        },

        {
            id:4,
            title:AppText.how_to_check_my_daily_task,
            text:AppText.daily_task
        },


        ]
    return(
      <ScrollView>
          <View style={styles.root}>

              {
                  guides.map(guide=>(
                      <View key={guide.id} style={{marginBottom:15,}}>
                          <HeadingText>{guide.title}</HeadingText>
                          <CustomText>{guide.text}</CustomText>
                      </View>
                  ))
              }



          </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    root:{
        padding:20,
    },
    item:{
        marginVertical:10,
    }
});

