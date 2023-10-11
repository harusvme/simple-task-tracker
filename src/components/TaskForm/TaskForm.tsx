import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TaskData } from "../../types/taskTypes";
import styles from "./TaskForm.module.scss";

interface TaskFormProps {
  onSubmit: SubmitHandler<TaskData>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>();

  return (
    <div className={styles.taskForm}>
      <h2>Создать задачу</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Номер:</label>
          <input type="number" {...register("id", { required: true })} />
          {errors.id && <span>Это поле обязательно</span>}
        </div>
        <div>
          <label>Заголовок:</label>
          <input type="text" {...register("title", { required: true })} />
          {errors.title && <span>Это поле обязательно</span>}
        </div>
        <div>
          <label>Описание:</label>
          <textarea {...register("description")} />
        </div>
        <div>
          <label>Дата окончания:</label>
          <input type="date" {...register("endDate")} />
        </div>
        <div>
          <label>Время в работе (часы):</label>
          <input type="number" {...register("workTime")} />
        </div>
        <div>
          <label>Приоритет:</label>
          <select {...register("priority")}>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default TaskForm;
