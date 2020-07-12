import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import * as Fonts from "expo-font";
import {AppLoading} from "expo";
import {AppText} from "./constants/text";
import {goalTable,stepsTable,tasksTable} from "./database/db";
import {Provider} from "react-redux";
import store from "./store/store";
import slides from "./constants/slides";

import {GuideStack,HistoryStack,HomeStack,ProgressTrackStack} from "./navigations";
import AppIntroSlider from 'react-native-app-intro-slider';

import SliderItem from "./components/ui/SliderItem";
import {getIntro, setIntroSlider} from "./constants/others";


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



export default function App(props) {

    const [isFontLoaded,setFontLoaded] = useState(false);
    const [showRealApp,setRealApp] = useState(true);

    const introSlider = useCallback(async()=>{
        const check = await getIntro();
        setRealApp(check);
    },[])

    useEffect(()=>{
        introSlider();
    },[introSlider])


    if(!isFontLoaded)
        return <AppLoading startAsync={loadFonts} onFinish={()=>setFontLoaded(true)}/>


   const  _onDone = async () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        await setIntroSlider('hide');
        setRealApp(true);
    }

   if(!showRealApp){
        return <AppIntroSlider renderItem={SliderItem} data={slides} onDone={_onDone}/>;
   }


  return (
    <Provider store={store}>
        <NavigationContainer>

            <Drawer.Navigator >
                <Drawer.Screen  name={AppText.home} children={HomeStack}/>
                <Drawer.Screen  name={AppText.history} children={HistoryStack}/>
                <Drawer.Screen  name={AppText.goal_settings} children={ProgressTrackStack}/>
                <Drawer.Screen  name={AppText.guide} children={GuideStack}/>
            </Drawer.Navigator>
        </NavigationContainer>
    </Provider>
  );






}






