import {AppText} from "../constants/text";
import GuideScreen from "../Screens/GuideScreen";
import React from "react";
import {headerLeft,headerRight,headerTitleStyle} from "./samenavigationprops";
import {createStackNavigator} from "@react-navigation/stack";
import {StyleSheet} from "react-native";

const Stack = createStackNavigator();


export default props=>(
    <Stack.Navigator>
        <Stack.Screen options={{...headerLeft(props),...headerRight(props),...headerTitleStyle}} name={AppText.guide} component={GuideScreen}/>
    </Stack.Navigator>
)

const styles = StyleSheet.create({
    headerRightStyle:{
        width: 30, height: 30,marginRight:10,
    }
})
