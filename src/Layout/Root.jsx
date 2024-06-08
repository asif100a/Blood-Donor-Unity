import { Outlet } from "react-router-dom";
import Navber from "../SharedComponents/Navber/Navber";
import Footer from "../SharedComponents/Footer/Footer";

const Root = () => {
    return (
        <div>
            <Navber />
            <div className="min-h-[calc(100vh-417px)] mb-12">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;