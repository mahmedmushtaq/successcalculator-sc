import {ADD_GOALS, DELETE_GOAL} from "../actions/goalsettings";

const initialData = {
    goals:[],
}

export default (state=initialData,actions)=>{

    switch (actions.type) {
        case ADD_GOALS:
            return{
                goals:[...actions.payload],
            }
        case DELETE_GOAL:
             const remainingGoal = state.goals.filter(goal=>goal.id !== actions.payload);
             return{
                 goals:[...remainingGoal],
             }
        default:
            return state;
    }
}
