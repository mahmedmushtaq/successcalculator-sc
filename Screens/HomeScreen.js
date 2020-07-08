import React, {useCallback, useEffect, useState} from "react";
import {View,ActivityIndicator,FlatList,StyleSheet} from "react-native";
import colors from "../constants/colors";
import { Button } from 'react-native-elements';
import {AppText} from "../constants/text";
import MyProgress from "../components/ui/MyProgress";
import TaskItem from "../components/ui/TaskItem";
import {CustomText} from "../components/ui/Text";
import AsyncStorage from "@react-native-community/async-storage";
import {HeadingText} from "../components/ui/HeadingText";
import {useDispatch, useSelector} from "react-redux";
import {loadGoal} from "../store/actions/homedataactions";
import {getStorageData} from "../constants/others";

export default props=>{

    const {tasks,goal,completedTasks,loading} = useSelector(store=>store.tasks);
    const dispatch = useDispatch();




    const loadData = useCallback(async ()=>{
         const check  = await getStorageData();

         await dispatch(loadGoal(check))

    },[dispatch])

    useEffect(()=>{
       loadData();
    },[loadData])

    const refresh = async ()=> {
       await loadData()
    };


    if(loading){
       return <View style={[styles.container, styles.horizontal]}>

           <ActivityIndicator size="large" color={colors.primary} />
       </View>
    }

    return(
        <View style={styles.container}>

            {
               !loading ? goal ? (

                    <View>

                        {
                            tasks.length === 0 ? <CustomText style={{alignSelf:'center'}}>{AppText.no_task_is_found}</CustomText> : (  <FlatList keyExtractor={(item)=>item.id.toString()} data={tasks} renderItem={(item)=>{
                           return  item.index === 0 ?  <View>
                               <MyProgress completedTasks={completedTasks} tasks={tasks} goal={goal}  refresh={refresh}/>
                                <TaskItem task={item.item}/>
                               </View> :     <TaskItem task={item.item}/>

                            }}/>
                            )
                        }

                </View>) : (
                    <HeadingText>{AppText.please_add_new_goal}</HeadingText>
                ) : <View/>
            }








            <View style={styles.newGoals}>
                <Button  buttonStyle={styles.newGoalsBtn} title={AppText.add_new_goal} onPress={()=>props.navigation.navigate("Add New Goal")} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      position:'relative',
      flex:1,
      padding:5,
    },

    newGoals:{
        position: 'absolute',
        right:30,
        bottom:30,
        backgroundColor:colors.primary,

    },

    newGoalsBtn:{
        paddingHorizontal:30,
        paddingVertical:15,
        backgroundColor:colors.primary
    },
    item:{
        marginVertical:10,
    },
    containerLoading: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});


