import blockImage from '../../assets/Block page (15).png';

const BlockPage = () => {
    return (
        <div className='relative'>
            <div>
                <img src={blockImage} alt="Block image" className='h-full w-full overflow-hidden' />
            </div>
            <div className='absolute top-6 w-full h-full'>
                <h1 className="text-6xl text-center font-semibold">You are blocked!</h1>
                <p className="text-4xl text-center mt-3">You {"'can't'"} create any donation request</p>
            </div>
        </div>
    );
};

export default BlockPage;