import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="w-auto flex dark:bg-[#292929]">
            <Sidebar />
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;