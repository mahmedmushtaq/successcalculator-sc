import {
    ADD_ALL_THREE,
    ADD_GOALS,
    ADD_TASKS,
    REMOVE_TASK,
    UPDATE_ALL_THREE,
    UPDATE_TASK
} from "../actions/homedataactions";

const initialState = {
    tasks:[],
    completedTasks:[],
    goal:{},
    steps:[],
    loading:true,


}


export default (state=initialState,actions)=>{

    switch (actions.type) {

        case ADD_ALL_THREE:
            return{
                ...state,
                tasks: actions.payload.tasks,
                goal:actions.payload.goal,
                steps:actions.payload.steps,
                completedTasks:actions.payload.completedTasksArray,
                loading:actions.payload.loading,
            }


        case REMOVE_TASK:
            const remainingTasks = state.tasks.filter(task=>task.id !== actions.payload);

            return{
                ...state,
                tasks: remainingTasks,
            }
        case UPDATE_TASK:
            const updateTasks = state.tasks.filter(task=>task.id !== actions.payload.id);
            return {
                ...state,
                tasks: [...updateTasks,actions.payload],
            }

        default:
            return state;
    }
}
