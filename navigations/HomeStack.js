import React, {useState} from "react";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import { Foundation} from "@expo/vector-icons";
import {AppText} from "../constants/text";
import FrontScreen from "../Screens/HomeScreen";
import {EditGoal,NewGoal} from "../Screens/goal-screens";
import EditTaskScreen from "../Screens/EditTaskScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {headerLeft,headerTitleStyle,imageAsset} from "./samenavigationprops";





const Stack = createStackNavigator();
export default props=>{


    const [refreshing,setRefreshing] = useState(false);



    return(
        <Stack.Navigator  >
            <Stack.Screen options={{...headerLeft(props),...headerTitleStyle}} name={AppText.home} component={FrontScreen}/>
            <Stack.Screen options={{...headerTitleStyle}}  name={AppText.update_goal} component={EditGoal}/>
            <Stack.Screen options={{...headerTitleStyle}}  name={AppText.add_new_goal} component={NewGoal}/>
            <Stack.Screen options={{...headerTitleStyle}}  name={AppText.edit_task_screen} component={EditTaskScreen}/>

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerRightStyle:{
        width: 30, height: 30,marginRight:10,
    }
})
