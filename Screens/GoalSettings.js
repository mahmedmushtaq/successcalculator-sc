import React, {useCallback, useEffect, useState} from "react";
import {View,Text,StyleSheet,TouchableOpacity} from "react-native";
import {CustomText} from "../components/ui/Text";
import {HeadingText} from "../components/ui/HeadingText";
import {CheckBox, Button, Overlay} from "react-native-elements";
import {AppText} from "../constants/text";
import {useDispatch, useSelector} from "react-redux";
import {storeData} from "../constants/others";
import {loadAllGoals,deleteSpecificGoal} from "../store/actions/goalsettings";
import colors from "../constants/colors";
import { Foundation } from '@expo/vector-icons';
import GoalModel from "../database/Models/GoalModel";



export default props=> {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const {goals} = useSelector(store => store.myprogress);
    const [deleteGoalId,setDeleteGoalId] = useState('');
    const [visible,setVisible] = useState(false);
    const [specificGoal,setSpecificGoal] = useState({});




    const loadData = useCallback(async () => {


      await dispatch(loadAllGoals());
    }, [dispatch]);


    const refresh = async ()=>{
        await loadData();
    }

    useEffect(() => {
        loadData();
    }, [loadData])

    const showOverlay = (goal)=>{
        setVisible(true);
        setSpecificGoal(goal);
    }

    const hideOverlay = ()=>{
        setVisible(false);
        setSpecificGoal(false);
    }

    const deleteGoal = ()=>{
        hideOverlay();
        dispatch(deleteSpecificGoal((specificGoal.id)))

    }

    const editGoal = ()=>{
        setVisible(false);
        props.navigation.navigate(AppText.update_goal,{
            specificGoal,
        });
    }

    const checkedGoal = async (goal)=>{
        await GoalModel.goalQuery('UPDATE goals SET show_on_front_screen=0');
        await GoalModel.goalQuery('UPDATE goals SET show_on_front_screen=1 WHERE id='+goal.id);
        storeData(goal.id.toString());
        refresh();

    }

    return (
        <View style={{padding:20,}}>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Overlay
                    isVisible={visible}
                    onBackdropPress={()=>hideOverlay()}
                >
                   <View>
                       <HeadingText style={{fontSize:15,}}>{specificGoal.wants_to}</HeadingText>
                       <Button buttonStyle={{backgroundColor:colors.primary,margin:5,}} title={AppText.edit} onPress={()=>editGoal()}/>
                       <Button buttonStyle={{backgroundColor:colors.asphalt,margin:5,}} title={AppText.delete} onPress={()=>deleteGoal()}/>

                   </View>
                </Overlay>
            </View>



            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <HeadingText style={styles.item}>{AppText.goals} {AppText.settings}</HeadingText>
                <Foundation name="refresh" size={24} color="black" onPress={refresh} />
            </View>

            {
                goals.map((goal, i) => (

                       <TouchableOpacity key={goal.id} style={{position:'relative'}} onLongPress={()=>showOverlay(goal)}>
                           <View >


                               <HeadingText style={{fontSize: 17,}}>{goal.wants_to}</HeadingText>



                               <CheckBox
                                   center
                                   title={AppText.i_want_to_show_this_goal_progress_in_my_front_screen}
                                   iconRight
                                   containerStyle={{padding: 5, fontSize: 12,}}
                                   checkedIcon='dot-circle-o'
                                   uncheckedIcon='circle-o'
                                   onLongPress={()=>showOverlay(goal)}
                                   checkedColor='red'
                                   checked={goal.show_on_front_screen === 1}
                                   onPress={() => checkedGoal(goal)}
                               />





                            </View>
                       </TouchableOpacity>
                ))
            }




        </View>
    )
}



const styles = StyleSheet.create({
    item:{
        marginVertical:10,
    }
});
