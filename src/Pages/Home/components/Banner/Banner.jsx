import { Link } from 'react-router-dom';
import './banner.css';

const Banner = () => {
    const someones = "someone's";

    return (
        <div className="background-img pt-24">
            {/* <div className='h-full w-full bg-black opacity-40'>

            </div> */}

            <div className='w-fit h-fit p-6 border bg-white bg-opacity-60 mx-auto text-center'>
                <h1 className='text-6xl font-semibold flex flex-col w-[56rem]'>
                    <span className='text-red-500'>Blood Donor Unity</span>
                    <span className='text-gray-900'>Empowering Lives, One Donation at a Time</span>
                </h1>
                <p className='text-lg mt-6 w-[58rem]'>Join Blood Donor Unity to make a life-saving impact. Together, we can ensure a steady supply of blood for those in need. Donate today and be a hero in {someones} story!</p>
            </div>

            <div className='mt-24 mx-auto w-fit h-fit space-x-24'>
                <Link to={'/register'}><button className='btn'>Join as a donor</button></Link>
                <Link to={'/search_page'}><button className='btn'>Search donors</button></Link>
            </div>
        </div>
    );
};

export default Banner;