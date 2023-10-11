export interface Task {
  id: number;
  title: string;
  projectId: number;
  description: string;
  creationDate: string;
  workTime: number;
  endDate: string;
  priority: "low" | "medium" | "high";
  attachments: string[];
  status: string;
  comments: IComment;
}

export interface TaskData {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  projectId: number;
  workTime: number;
  endDate: string;
  priority: "low" | "medium" | "high";
  attachments: string[];
  status: string;
}

export interface IComment {
  id: number;
  items: [];
}

export interface Item {
  id: number;
  name: string;
  items: [];
}
