import { Link } from "react-router-dom";
import Allblogs from "../../../../SharedComponents/Allblogs/Allblogs";

const ContentManagement = () => {
    return (
        <div>
            <h1>Content Management</h1>
            <div className="my-6 text-end">
                <Link to={'/dashboard/content_management/add_blog'}><button className="btn">Add blog</button></Link>
            </div>

            <div className="text-center my-5">
                <button className="btn">Sort by</button>
            </div>

            <div>
                <Allblogs />
            </div>
        </div>
    );
};

export default ContentManagement;