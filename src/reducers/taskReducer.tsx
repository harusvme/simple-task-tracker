import { Task } from "../types/taskTypes";
import {
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK_STATUS,
} from "../actions/taskActions";
import { format } from "date-fns";

const initialState = {
  tasks: [] as Task[],
};

const initialTask = {
  creationDate: format(new Date(), "yyyy-MM-dd"),
  status: "Queue",
};

// Определение типов для действий
interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number;
}

interface UpdateTaskStatusAction {
  type: typeof UPDATE_TASK_STATUS;
  payload: { taskId: number; newStatus: string };
}

type TaskActionTypes =
  | AddTaskAction
  | DeleteTaskAction
  | UpdateTaskStatusAction;

const taskReducer = (state = initialState, action: TaskActionTypes) => {
  switch (action.type) {
    case ADD_TASK:
      const { id, projectId, ...rest } = action.payload;

      if (state.tasks.some((task) => task.id === id)) {
        window.alert("Такой номер задачи уже существует");
        return state;
      }

      const newTask: Task = {
        id,
        projectId,
        ...initialTask,
        ...rest,
        comments: {
          id: 1,
          items: [],
        },
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    case DELETE_TASK:
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );

      return {
        ...state,
        tasks: updatedTasks,
      };

    case UPDATE_TASK_STATUS:
      const { taskId, newStatus } = action.payload;
      const updatedTasksStatus = state.tasks.map((task) => {
        if (task.id == taskId) {
          const updatedTask = { ...task, status: newStatus };
          return updatedTask;
        }
        return task;
      });
      return {
        ...state,
        tasks: updatedTasksStatus,
      };
    default:
      return state;
  }
};

export default taskReducer;
