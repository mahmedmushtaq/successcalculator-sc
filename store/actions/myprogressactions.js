import GoalModel from "../../database/Models/GoalModel";
import TaskModel from "../../database/Models/TaskModel";

export const ADD_GOALS = "ADD_GOALS";
export const DELETE_GOAL = "DELETE_GOAL";
export const ADD_STEPS = "ADD_STEPS";


export const loadAllGoals = ()=> async dispatch=>{
    console.log("all goals = ");
     const goals = await GoalModel.getGoals({completed:false});


     dispatch({
         type:ADD_GOALS,
         payload:goals.rows._array,
     })

};

export const deleteSpecificGoal = (id)=>async dispatch=>{
     await GoalModel.deleteGoalById(id);
     await TaskModel.deleteGoalTasks(id);
     dispatch({
         type:DELETE_GOAL,
         payload:id,
     })

}


