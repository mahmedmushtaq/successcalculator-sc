import {combineReducers} from "redux";
import homedata from "./reducers/homedatareducers";
import myprogress from "./reducers/myprogressreducers";
import updatereducers from "./reducers/updatereducers";
const root = combineReducers({
     tasks:homedata,
     myprogress,
     updatereducers
});

export default root;
