import { TaskData } from "../types/taskTypes";

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";

export const addTask = (taskData: TaskData) => ({
  type: ADD_TASK,
  payload: taskData,
});

export const deleteTask = (taskId: number) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const updateTaskStatus = (taskId: number, newStatus: string) => ({
  type: UPDATE_TASK_STATUS,
  payload: { taskId, newStatus },
});
