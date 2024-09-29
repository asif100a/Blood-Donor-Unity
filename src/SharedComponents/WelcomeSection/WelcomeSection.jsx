import PropTypes from 'prop-types';
import logo from '../../assets/Blood_Donor_Unity.png';

const WelcomeSection = ({title, description}) => {
    return (
        <div>
            <section className="w-auto">
                <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
                    <img src={logo} alt="" className='w-24 h-28' />
                    <h1 className="px-6 py-2 text-2xl font-semibold text-center sm:text-3xl lg:text-4xl lg:max-w-lg xl:max-w-xl dark:text-gray-700 w-auto md:w-[28rem]">{title}</h1>

                    <p className='text-lg font-normal max-w-full md:max-w-3xl text-center'>{description}</p>
                </div>
            </section>
        </div>
    );
};

WelcomeSection.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
};

export default WelcomeSection;