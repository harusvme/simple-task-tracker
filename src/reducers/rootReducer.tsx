import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import fileReducer from "./fileReducer";

const rootReducer = combineReducers({
  task: taskReducer,
  file: fileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
