import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="flex w-screen lg:w-auto ">
            <Sidebar />
            <div className="flex-1 p-6 mini-width">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;