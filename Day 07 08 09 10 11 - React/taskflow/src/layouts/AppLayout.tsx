import { Outlet} from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../state/authContext";

function AppLayout()
{
  const {user, logout}= useAuth();
    return (
        <div className="app">
      <Header userName={user?.name ?? 'there'} onLogout={logout}  />

      <div className="app-body">
        <Sidebar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
    )
}
export default AppLayout;