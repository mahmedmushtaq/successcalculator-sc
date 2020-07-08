import React, {useState} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import FrontScreen from "./Screens/HomeScreen";
import { Entypo } from '@expo/vector-icons';
import colors from "./constants/colors";
import * as Fonts from "expo-font";
import NewGoal from "./Screens/NewGoal";
import {AppLoading} from "expo";
import {AppText} from "./constants/text";
import {goalTable,stepsTable,tasksTable} from "./database/db";
import HistoryScreen from "./Screens/HistoryScreen";
import ProgressScreen from "./Screens/ProgressScreen";
import GuideScreen from "./Screens/GuideScreen";
import {Provider} from "react-redux";
import store from "./store/store";
import EditGoal from "./Screens/EditGoal";
import EditTaskScreen from "./Screens/EditTaskScreen";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

goalTable().catch(err=>{
    console.log("goal table error = ",err);
})

stepsTable().catch(err=>{
    console.log("steps table error = ",err);
})
tasksTable().catch(err=>{
    console.log("tasks table error = ",err);
})



const loadFonts = ()=>{
    return Fonts.loadAsync({
        "fredokaOne":require("./assets/fonts/FredokaOne-Regular.ttf"),
        "raleway":require("./assets/fonts/Raleway-Medium.ttf"),
    })
}



export default function App() {

    const [isFontLoaded,setFontLoaded] = useState(false);

    if(!isFontLoaded)
        return <AppLoading startAsync={loadFonts} onFinish={()=>setFontLoaded(true)}/>



    const headerLeft =(props)=>( {
        headerLeft:()=>(
            <Entypo name="menu" size={24} color="black" onPress={()=>props.navigation.openDrawer()} />

        ),
        headerTitleContainerStyle:{
            left:50,
        },
        headerLeftContainerStyle:{
            left:10,
        }
    })

    const headerRight =(props)=>( {
        headerRight:()=>(
            <FontAwesome name="plus" size={24}  color="white" onPress={()=>props.navigation.navigate(AppText.add_new_goal)}  />

        ),
        headerRightContainerStyle:{
            backgroundColor:colors.primary,
            width:45,
            height:45,
            right:20,
            marginVertical:'auto',
            justify:'center',
            alignItems:'center',
            resizeMode:'contains',
            borderRadius:50,
        }

    })
    const headerTitleStyle = {
        headerTitleStyle:{
            fontFamily:'fredokaOne'
        }
    }

  //   =============================================== STACKS =========================================

  const HomeStack = (props)=>(
      <Stack.Navigator  >
          <Stack.Screen options={{...headerLeft(props),...headerRight(props),...headerTitleStyle}} name={AppText.home} component={FrontScreen}/>
          <Stack.Screen options={{...headerTitleStyle}}  name={AppText.add_new_goal} component={NewGoal}/>
          <Stack.Screen options={{...headerTitleStyle}}  name={AppText.edit_task_screen} component={EditTaskScreen}/>

      </Stack.Navigator>
  )

  const HistoryStack = props=>(
      <Stack.Navigator>
          <Stack.Screen options={{...headerLeft(props),...headerRight(props),...headerTitleStyle}} name={AppText.history} component={HistoryScreen}/>
      </Stack.Navigator>
  )

  const GuideStack = props=>(
        <Stack.Navigator>
            <Stack.Screen options={{...headerLeft(props),...headerRight(props),...headerTitleStyle}} name={AppText.guide} component={GuideScreen}/>
        </Stack.Navigator>
    )
   const progressTrack = props=>(
        <Stack.Navigator>
            <Stack.Screen options={{...headerLeft(props),...headerRight(props),...headerTitleStyle}}  name={AppText.goal_settings} component={ProgressScreen}/>
            <Stack.Screen options={{...headerTitleStyle}}  name={AppText.update_goal} component={EditGoal}/>
        </Stack.Navigator>
   )

  return (
    <Provider store={store}>
        <NavigationContainer>

            <Drawer.Navigator >
                <Drawer.Screen  name={AppText.home} children={HomeStack}/>
                <Drawer.Screen  name={AppText.history} children={HistoryStack}/>
                <Drawer.Screen  name={AppText.goal_settings} children={progressTrack}/>
                <Drawer.Screen  name={AppText.guide} children={GuideStack}/>
            </Drawer.Navigator>
        </NavigationContainer>
    </Provider>
  );
}


