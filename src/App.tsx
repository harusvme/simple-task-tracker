import { Route, Routes } from "react-router-dom";
import TaskPage from "./screens/TasksPage";
import ProjectPage from "./screens/ProjectsPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectPage />} />
      <Route path="/projects/:projectId" element={<TaskPage />} />
    </Routes>
  );
};

export default App;
