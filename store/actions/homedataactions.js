import {useCallback} from "react";
import GoalModel from "../../database/Models/GoalModel";
import TaskModel from "../../database/Models/TaskModel";
import colors from "../../constants/colors";
import StepModel from "../../database/Models/StepModel";
import {getStorageData} from "../../constants/others";


export const ADD_TASKS = "ADD_TASKS";
export const ADD_ALL_THREE = "ADD_ALL_THREE";
export const REMOVE_TASK = "REMOVE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";


const backgroundColors = [ '#34495e',
    '#2ecc71',
    '#2980b9',
    '#9b59b6',
    '#16a085',
    '#d35400',
    '#7f8c8d',
];


export const loadGoal = ()=> async dispatch=>{

    const check  = await getStorageData();

    let goalData = {};


    const data = await  GoalModel.getGoals({completed:false});


    if(!check) {
        if(data.rows.length >= 1){
            goalData = data.rows._array[0];
        }
    }else{
        if(data.rows.length >= 1){
           goalData = data.rows._array.find(singleData=>singleData.id === parseInt(check));

        }
    }



    await taskData(goalData,dispatch);



}

const taskData = async (goalData,dispatch,type=ADD_ALL_THREE)=>{

    const tasksload = await TaskModel.getAllTasksByStepIdAndStatus(goalData.id,false);


    let tasksArray = [];
    let completedTaskArray = [];
    let stepsArray = [];
    const loadTasksArray = tasksload.rows._array;


    if(tasksload.rows.length === 0){
       return dispatch({
            type,
            payload:{
                loading:false,
                goal:goalData,
                tasks:[],
                steps:[],
            }
        })

    }


    loadTasksArray.map( async (singleTask,i)=>{



        let selectedColor = '';
        if (i === 0)
            selectedColor = colors.primary;
        else if (i === 1)
            selectedColor = colors.lightRed;
        else
            selectedColor = backgroundColors[Math.floor(Math.random() * (backgroundColors.length - 1)) + 0];

        const stepData = await StepModel.getStepById(singleTask.step_id);

        stepsArray.push(stepData);

        const newTaskObject = {
            ...singleTask,
            selectedColor,
            step: {...stepData.rows._array[0]},

        }



        if(singleTask.completed === "false"){
            tasksArray.push(newTaskObject)

        }else{
            completedTaskArray.push(newTaskObject)
        }



        if((i+1) === loadTasksArray.length){
            dispatch({
                type,
                payload:{
                    loading:false,
                    goal:goalData,
                    tasks:tasksArray,
                    completedTasksArray:completedTaskArray,
                    steps:stepsArray,

                }
            })



        }


    })



}


export const deleteParticularTask = id=>async dispatch=>{
    const task = await TaskModel.deleteTask(id);
    dispatch({
        type:REMOVE_TASK,
        payload:id,
    })


}

export const updateTask = task=>async dispatch=>{
    await TaskModel.updateAllTasksById(task,task.id);
    dispatch({
        type:UPDATE_TASK,
        payload:task,
    })


}




