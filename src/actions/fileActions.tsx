import { Action } from "redux";

export const UPDATE_FILES = "UPDATE_FILES";

export interface UpdateFilesAction extends Action<typeof UPDATE_FILES> {
  payload: {
    taskId: number;
    files: File[];
  };
}

export const updateFiles = (
  taskId: number,
  files: File[]
): UpdateFilesAction => ({
  type: UPDATE_FILES,
  payload: { taskId, files },
});
