import React from "react";
import {AppText} from "../constants/text";
import HistoryScreen from "../Screens/HistoryScreen";
import {headerLeft,headerRight,headerTitleStyle} from "./samenavigationprops";
import {createStackNavigator} from "@react-navigation/stack";
import {StyleSheet} from "react-native";

const Stack = createStackNavigator();

export default props=>{

    return(
        <Stack.Navigator>
            <Stack.Screen options={{...headerLeft(props),...headerRight(props),...headerTitleStyle}} name={AppText.history} component={HistoryScreen}/>
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({
    headerRightStyle:{
        width: 30, height: 30,marginRight:10,
    }
})
