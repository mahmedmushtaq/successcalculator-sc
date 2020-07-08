import {LOAD_DATA_FOR_UPDATE} from "../actions/updateactions";

const initialState = {
    goalData:{},
    stepsArray:[]
}


export default (state=initialState,actions)=>{

    switch (actions.type) {
        case LOAD_DATA_FOR_UPDATE:
            return{
                ...state,
                goalData: actions.payload.goalData,
                stepsArray: [...actions.payload.stepsArray],
            }
        default:
            return state;

    }
}
