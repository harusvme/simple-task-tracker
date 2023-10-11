import styles from "./Task.module.scss";
import { deleteTask } from "../../actions/taskActions";
import { useDispatch } from "react-redux";
import Comment from "../Comment/Comment";
import { useState } from "react";
import useNode from "../../hooks/useNode";
import { Item } from "../../types/taskTypes";
import FileUploadComponent from "../FileUploadComponent/FileUploadComponent";

interface ITask {
  task: {
    id: number;
    title: string;
    projectId: number;
    description: string;
    creationDate: string;
    workTime: number;
    endDate: string;
    priority: "low" | "medium" | "high";
    status: string;
    subtasks?: {
      id: number;
      title: string;
      status: string;
    }[];
    comments: {
      id: number;
      items: [];
    };
  };
}

const Task: React.FC<ITask> = ({ task }) => {
  const [commentsData, setCommentsData] = useState(task.comments);

  const { insertNode, editNode, deleteNode, getNode } = useNode();

  const handleInsertNode = (folderId: number, item: Item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId: number, value: number) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId: number) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  const handleShowNode = () => {
    const finalStructure = getNode(commentsData);
    setCommentsData(finalStructure);
  };

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    localStorage.removeItem("uploadedFiles");
    dispatch(deleteTask(task.id));
  };

  return (
    <div className={styles.task}>
      <h3>{task.title}</h3>
      <p>Номер задачи: {task.id}</p>
      <p>{task.description}</p>
      <p>Дата создания: {task.creationDate}</p>
      <p>Время в работе: {task.workTime} часов</p>
      <p>Дата окончания: {task.endDate}</p>
      <p>Приоритет: {task.priority}</p>
      <p>Статус: {task.status}</p>
      <div>
        <h2>Загрузка файлов</h2>
        <FileUploadComponent taskId={task.id} />
      </div>
      <div>
        <h2>Комментарии</h2>
        <Comment
          handleShowNode={handleShowNode}
          handleInsertNode={handleInsertNode}
          handleEditNode={handleEditNode}
          handleDeleteNode={handleDeleteNode}
          comment={commentsData}
        />
      </div>
      <button onClick={handleDeleteClick}>Удалить задачу</button>
    </div>
  );
};

export default Task;
