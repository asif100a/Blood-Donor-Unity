import CountCard from "../../../../SharedComponents/CountCard/CountCard";
import WelcomeSection from "../../../../SharedComponents/WelcomeSection/WelcomeSection";

const VolunteerHome = () => {
    return (
        <div className="bg-inherit">
            <WelcomeSection title={'Volunteer Dashboard'} description={"Welcome to the Volunteer Dashboard! Here, you embark on a journey of compassion and impact. From organizing drives to spreading awareness, your actions make a difference. Thank you for joining us in this lifesaving mission alongside our dedicated donors and fellow volunteers."} />
            <CountCard />
        </div>
    );
};

export default VolunteerHome;