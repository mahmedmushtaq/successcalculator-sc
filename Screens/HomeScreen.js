import React, {useCallback, useEffect, useState} from "react";
import {View,ActivityIndicator,Animated,FlatList,StyleSheet,Easing} from "react-native";
import colors from "../constants/colors";
import { Button } from 'react-native-elements';
import {AppText} from "../constants/text";
import MyProgress from "../components/ui/MyProgress";
import TaskItem from "../components/ui/TaskItem";

import {HeadingText} from "../components/ui/HeadingText";
import {useDispatch, useSelector} from "react-redux";
import {loadGoal} from "../store/actions/homedataactions";

const refreshImg = require("../assets/custom_icons/refresh.svg");

export default props=>{

    const {tasks,goal,completedTasks,loading} = useSelector(store=>store.tasks);
    const dispatch = useDispatch();
     const {refresh,setRefresh} = props;





    const loadData = useCallback(async ()=>{
        await dispatch(loadGoal())
        setRefresh(false);
        },[refresh])

    useEffect(()=>{
       loadData();
       },[loadData])




    if(loading || refresh){
       return <View style={[styles.container, styles.horizontal]}>

           <ActivityIndicator size="large" color={colors.primary} />
       </View>
    }






    return(
        <View style={styles.container}
        >




            {
               !loading ? goal.id ? (

                    <View>


                        {
                            tasks.length ===0 ? <View >
                                <MyProgress completedTasks={completedTasks} tasks={tasks} goal={goal}/>
                                <View style={styles.noTaskContainer}>
                                    <HeadingText>{AppText.no_task_is_found}</HeadingText>
                                </View>

                               </View>:   <FlatList  keyExtractor={(item)=>item.id.toString()} data={tasks} renderItem={(item)=>{
                                return item.index === 0 ?<View>
                                        <MyProgress completedTasks={completedTasks} tasks={tasks} goal={goal}/>
                                        <TaskItem task={item.item}/>
                                    </View>
                                    :     <TaskItem task={item.item}/>


                            }}/>

                        }


                        <Button containerStyle={styles.addMoreTaskBtn} buttonStyle={{color:colors.primary,}} title={AppText.add_more_task}
                                onPress={()=>props.navigation.navigate(AppText.update_goal,{specificGoal: goal})}
                        />












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
    },
    noTaskIsFoundTv:{
        marginLeft:'auto',
        marginRight:'auto',
    },
    noTaskContainer:{
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent:'center',
        alignItems:'center'
    },
    addMoreTaskBtn:{
        width:"40%",
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:10,
    }

});


