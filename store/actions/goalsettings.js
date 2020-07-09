import GoalModel from "../../database/Models/GoalModel";
import TaskModel from "../../database/Models/TaskModel";

export const ADD_GOALS = "ADD_GOALS";
export const DELETE_GOAL = "DELETE_GOAL";
export const ADD_STEPS = "ADD_STEPS";



export const loadAllGoals = (store=true)=> async dispatch=>{
    const goals = await GoalModel.getGoals({completed:false});


    if(store) {
        // if store true then it means you want to dispatch all goals
        dispatch({
            type: ADD_GOALS,
            payload: goals.rows._array,
        })
    }else{
        // you only wants all goals from db, no need to dispatch this
        return goals.rows._array;
    }

};

export const deleteSpecificGoal = (id)=>async dispatch=>{
     await GoalModel.deleteGoalById(id);
     await TaskModel.deleteGoalTasks(id);
     dispatch({
         type:DELETE_GOAL,
         payload:id,
     })

}


