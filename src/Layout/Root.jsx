import { Outlet } from "react-router-dom";
import Navber from "../SharedComponents/Navber/Navber";
import Footer from "../SharedComponents/Footer/Footer";

const Root = () => {
    return (
        <div>
            <Navber />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;