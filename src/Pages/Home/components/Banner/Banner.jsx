import { Link } from 'react-router-dom';
import './banner.css';
import { IoSearchSharp } from 'react-icons/io5';

const Banner = () => {
    const someones = "someone's";

    return (
        <div className="background-img pt-8 md:pt-12 lg:pt-24">
            <div className='w-full lg:w-fit h-fit p-6 border bg-white bg-opacity-55 dark:bg-opacity-70 rounded-2xl mx-auto text-center'>
                <h1 className='text-3xl lg:text-6xl font-semibold flex flex-col w-full lg:w-[56rem]'>
                    <span className='text-red-500'>Blood Donor Unity</span>
                    <span className='text-gray-900'>Empowering Lives, One Donation at a Time</span>
                </h1>
                <p className='text-lg mt-6 w-full lg:w-[58rem] text-gray-900'>Join Blood Donor Unity to make a life-saving impact. Together, we can ensure a steady supply of blood for those in need. Donate today and be a hero in {someones} story!</p>
            </div>

            <div className='mt-3 md:mt-8 lg:mt-24 mx-auto flex flex-col md:flex-row w-fit h-fit space-y-2 md:space-y-0 md:space-x-24'>
                <Link to={'/register'}>
                    <button className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-orange-600 transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6 bg-gray-50 bg-opacity-70  group rounded-full border border-orange-600">
                        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-orange-600 group-hover:h-full"></span>
                        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Join as a donor</span>
                    </button>
                </Link>

                <Link to={'/search_page'}>
                    <button className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-green-600 transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6 bg-gray-50 bg-opacity-70 group rounded-full border border-green-500">
                        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-green-500 group-hover:h-full"></span>
                        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                            <IoSearchSharp className='text-xl text-orange-600' />
                        </span>
                        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                            <IoSearchSharp className='text-white text-xl' />
                        </span>
                        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Search donors</span>
                    </button>
                </Link>

            </div>
        </div>
    );
};

export default Banner;