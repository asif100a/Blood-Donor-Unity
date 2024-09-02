import CountCard from "../../../../SharedComponents/CountCard/CountCard";
import WelcomeSection from "../../../../SharedComponents/WelcomeSection/WelcomeSection";

const AdminHome = () => {
    return (
        <div className="">
            <WelcomeSection title={'Admin Dashboard Empowering Lifesaving Efforts'} description={"Welcome to the Admin Dashboard! Here, you wield the tools to streamline operations, foster engagement, and amplify the impact of our blood donation platform. Together, let's lead the charge in saving lives."} />
            <CountCard />
        </div>
    );
};

export default AdminHome;