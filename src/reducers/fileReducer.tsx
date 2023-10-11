import { Reducer } from "redux";
import { UPDATE_FILES, UpdateFilesAction } from "../actions/fileActions";

interface FileState {
  [taskId: number]: File[];
}

const initialState: FileState = {};

const fileReducer: Reducer<FileState, UpdateFilesAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_FILES:
      const { taskId, files } = action.payload;
      return {
        ...state,
        [taskId]: files,
      };
    default:
      return state;
  }
};

export default fileReducer;
