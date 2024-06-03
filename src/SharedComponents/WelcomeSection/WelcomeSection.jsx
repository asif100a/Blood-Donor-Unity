import PropTypes from 'prop-types';
import logo from '../../assets/Blood.png';

const WelcomeSection = props => {
    return (
        <div>
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
                    <img src={logo} alt="" className='w-24 h-28' />
                    <h1 className="px-6 py-2 text-2xl font-semibold text-center sm:font-bold sm:text-3xl md:text-4xl lg:max-w-lg xl:max-w-xl dark:text-gray-700">Welcome to Your Donor Dashboard</h1>

                    <p className='text-lg font-normal max-w-3xl text-center'>Thank you for your selfless commitment to saving lives. Here, you can view your donation history, find upcoming donation events, and access important information to ensure a smooth and rewarding donation experience. Together, we make a difference!</p>
                </div>
            </section>
        </div>
    );
};

WelcomeSection.propTypes = {

};

export default WelcomeSection;