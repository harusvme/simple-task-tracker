import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ProjectPage.module.scss";

const ProjectPage: React.FC = () => {
  const [newProjectName, setNewProjectName] = useState("");
  const [projects, setProjects] = useState<Array<{ id: number; name: string }>>(
    []
  );

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(storedProjects);
  }, []);

  const createNewProject = () => {
    if (newProjectName) {
      const newProject = {
        id: Date.now(),
        name: newProjectName,
      };
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      setNewProjectName("");

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    }
  };

  const deleteProject = (projectId: number) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updatedProjects);

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className={styles.projectPage}>
      <h1 className={styles.title}>Список проектов</h1>
      <ul className={styles.projectList}>
        {projects.map((project) => (
          <li key={project.id} className={styles.projectItem}>
            <Link to={`/projects/${project.id}`} className={styles.projectLink}>
              <div className={styles.projectInfo}>
                <span className={styles.projectName}>{project.name}</span>{" "}
                <button
                  onClick={() => deleteProject(project.id)}
                  className={styles.deleteButton}
                >
                  Удалить
                </button>{" "}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.createProject}>
        <input
          type="text"
          placeholder="Введите название проекта"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button onClick={createNewProject} className={styles.createButton}>
          Создать проект
        </button>
      </div>
    </div>
  );
};

export default ProjectPage;
