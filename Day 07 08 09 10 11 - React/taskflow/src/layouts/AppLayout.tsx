import { Outlet} from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useTasks } from "../hooks/useTasks";

function AppLayout()
{
    const taskApi = useTasks();
    return (
        <div className="app">
      <Header userName="Mostafa" />

      <div className="app-body">
        <Sidebar />

        <main className="main-content">
          <Outlet context={taskApi} />
        </main>
      </div>
    </div>
    )
}
export default AppLayout;