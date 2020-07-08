import root from "./rootReducer";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

const store = createStore(root,applyMiddleware(thunk));

export default store;
