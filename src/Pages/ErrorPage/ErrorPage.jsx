import { Link } from 'react-router-dom';
import errorImg from '../../assets/404-Error-Page-Donut-Template-1024x768.jpg'

const ErrorPage = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center relative'>
            <div className='h-fit w-fit'>
                <img src={errorImg} alt="" className='max-w-2xl h-auto' />
            </div>

            <div className='absolute bottom-[170px]'>
                <Link to={'/'}><button className="relative inline-flex items-center justify-center px-[72px] py-3 text-lg font-medium tracking-tighter text-[#ffff] bg-gray-800 rounded-full group">
                    <span className="absolute inset-0 w-full h-full mt-1 ml-0 transition-all duration-300 ease-in-out bg-[#a2e1c0] rounded-full group-hover:mt-0 group-hover:ml-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-[#f3c7b9] rounded-full "></span>
                    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[#a2e1c0] rounded-full opacity-0 group-hover:opacity-100 "></span>
                    <span className="relative text-[#ffff] transition-colors duration-200 ease-in-out delay-100 group-hover:text-[#ffff]">Back to Home</span>
                </button></Link>

            </div>
        </div>
    );
};

export default ErrorPage;