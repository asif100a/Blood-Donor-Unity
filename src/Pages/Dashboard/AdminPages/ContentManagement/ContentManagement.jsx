import Allblogs from "../../../../SharedComponents/Allblogs/Allblogs";

const ContentManagement = () => {
    return (
        <div>
            <h1 className="text-4xl font-semibold text-center dark:text-gray-100 capitalize my-6">Manage Your content</h1>

            <div>
                <Allblogs admin={true} />
            </div>
        </div>
    );
};

export default ContentManagement;