import TaskModel from "../../database/Models/TaskModel";

import GoalModel from "../../database/Models/GoalModel";
import StepModel from "../../database/Models/StepModel";

export const LOAD_DATA_FOR_UPDATE = "LOAD_DATA_FOR_UPDATE";



export const loadUpdateData = (goalData)=> async dispatch=>{

    const loadSteps = await StepModel.getStepsByGoalIdWithStatus(goalData.id);


    const stepsArray = [];

    await loadSteps.rows._array.map(async (step,i)=>{
        const tasks = await TaskModel.getAllTasksByStepIdAndStatus(step.id,false);

        const tasksArray = tasks.rows._array.map(task=>{
            return {
                ...task,
                 set_end_time: task.end_time ? true : false,
                 showDate:false,
                 fromDb:true,
                 date:task.end_time ? task.end_time :new Date(1598051730000),
                 completed:false,

            }
        })

        stepsArray.push({
            ...step,fromDb:true,tasks:tasksArray,
        });

       if((i+1) === loadSteps.rows.length){
           dispatch({
               type:LOAD_DATA_FOR_UPDATE,
               payload:{
                   goalData,
                   stepsArray,
               }
           })
       }

    })








}
