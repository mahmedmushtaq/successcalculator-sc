import {AppText} from "../constants/text";
import ProgressScreen from "../Screens/goal-screens/GoalSettings";
import {EditGoal} from "../Screens/goal-screens";
import React from "react";
import {headerLeft,headerRight,headerTitleStyle} from "./samenavigationprops";
import {createStackNavigator} from "@react-navigation/stack";
import {StyleSheet} from "react-native";

const Stack = createStackNavigator();


const ProgressTrackStack = props=>(
    <Stack.Navigator>
        <Stack.Screen options={{...headerLeft(props),...headerRight(props),...headerTitleStyle}}  name={AppText.goal_settings} component={ProgressScreen}/>
        <Stack.Screen options={{...headerTitleStyle}}  name={AppText.update_goal} component={EditGoal}/>
    </Stack.Navigator>
)

const styles = StyleSheet.create({
    headerRightStyle:{
        width: 30, height: 30,marginRight:10,
    }
})


export default ProgressTrackStack;
