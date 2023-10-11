import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../reducers/rootReducer";
import TaskForm from "../components/TaskForm/TaskForm";
import Modal from "../components/Modal/Modal";
import { addTask } from "../actions/taskActions";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { updateTaskStatus } from "../actions/taskActions";
import styles from "./TaskPage.module.scss";
import Task from "../components/Task/Task";

const TaskPage: React.FC = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) =>
    state.task.tasks.filter((task) => task.projectId === Number(projectId))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (taskData: any) => {
    const taskWithProjectId = { ...taskData, projectId: Number(projectId) };
    dispatch(addTask(taskWithProjectId));
    closeModal();
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    let newStatus;
    switch (result.destination.droppableId) {
      case "queueColumn":
        newStatus = "Queue";
        break;
      case "developmentColumn":
        newStatus = "Development";
        break;
      case "doneColumn":
        newStatus = "Done";
        break;
      default:
        newStatus = "Queue";
    }

    const movedTaskId = parseInt(result.draggableId, 10);

    dispatch(updateTaskStatus(movedTaskId, newStatus));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.content}>
        <div className={styles.linkContainer}>
          <Link to="/">Назад</Link>
        </div>
        <h1>Список задач</h1>
        <div className={styles.buttonContainer}>
          <button onClick={openModal}>Создать задачу</button>
        </div>
        <div className={styles.container}>
          <Droppable droppableId="queueColumn">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.dragColumn}
              >
                <div className={styles.columnHeader}>Queue</div>
                {tasks
                  .filter((task) => task.status === "Queue")
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="developmentColumn">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.dragColumn}
              >
                <div className={styles.columnHeader}>Development</div>
                {tasks
                  .filter((task) => task.status === "Development")
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="doneColumn">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.dragColumn}
              >
                <div className={styles.columnHeader}>Done</div>
                {tasks
                  .filter((task) => task.status === "Done")
                  .map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className={styles.modal}>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            <TaskForm onSubmit={handleSubmit} />
          </Modal>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskPage;
