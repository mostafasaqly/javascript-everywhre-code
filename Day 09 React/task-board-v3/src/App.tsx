import { Route, Routes } from "react-router";
import { Layout } from "./Layout";
import { TaskListPage } from "./pages/TaskListPage";
import { NewTaskPage } from "./pages/NewTaskPage";
import { TaskDetailPage } from "./pages/TaskDetailPage";
import { EditTaskPage } from "./pages/EditTaskPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<TaskListPage />} />
        <Route path="tasks/new" element={<NewTaskPage />} />
        <Route path="tasks/:id" element={<TaskDetailPage />} />
        <Route path="tasks/:id/edit" element={<EditTaskPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}