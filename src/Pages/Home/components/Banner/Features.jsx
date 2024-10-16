import backgroundImage from "../../../../assets/feature-background.jpg";

const Features = () => {
    return (
        <section className="bg-white dark:bg-[#292929] mt-0 py-10">
            <div className="mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-gray-100 text-center md:text-start md:ml-6 lg:ml-20"> The key features</h1>

                <div style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                }} >
                    <div className="mt-8 xl:mt-12 flex justify-end items-center py-6 lg:py-16 bg-transparent dark:bg-[#0000000F]">
                        <div className="grid w-fit grid-cols-1 gap-6 lg:w-1/2 xl:gap-16 md:grid-cols-2 mx-6 lg:mx-12">
                            {/* 1 card */}
                            <div className="p-6 bg-white bg-opacity-30 dark:bg-opacity-45 border rounded-xl border-r-gray-200 dark:border-gray-700 h-fit">
                                <div className="md:flex md:items-start md:-mx-4">
                                    <span className="inline-block p-2 border border-orange-600 rounded-xl md:mx-4 dark:bg-transparent">
                                        <img src="https://i.ibb.co/YhLSNTg/5065729.png" alt="Feature logo" className="w-16 h-10" />
                                    </span>

                                    <div className="mt-4 md:ml-1 md:mt-0">
                                        <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-gray-900">Easy Donor Registration By Any Device</h1>

                                        <ul className="list-[circle] dark:text-gray-700 ml-6 mt-3">
                                            <li>Quick, Simplified and user-friendly registration process</li>
                                            <li>Mobile-friendly registration</li>
                                            <li>Secure data handling</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* 2 card */}
                            <div className="p-6 bg-white bg-opacity-30 dark:bg-opacity-45 border rounded-xl border-r-gray-200 dark:border-gray-700 h-fit">
                                <div className="md:flex md:items-start md:-mx-4">
                                    <span className="inline-block p-2 border border-green-500 rounded-xl md:mx-4 dark:bg-transparent">
                                        <img src="https://i.ibb.co/0q9Rc9d/3430447.png" alt="Feature logo" className="w-10 h-10" />
                                    </span>

                                    <div className="mt-4 md:ml-1 md:mt-0">
                                        <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-gray-900">Real-Time Donation Requests</h1>

                                        <ul className="list-[circle] dark:text-gray-700 ml-6 mt-3">
                                            <li>Instant alerts for urgent requests</li>
                                            <li>Geolocation-based requests</li>
                                            <li>Immediate response options</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* 3 card */}
                            <div className="p-6 bg-white bg-opacity-30 dark:bg-opacity-45 border rounded-xl border-r-gray-200 dark:border-gray-700 h-fit">
                                <div className="md:flex md:items-start md:-mx-4">
                                    <span className="inline-block p-2 border border-blue-500 rounded-xl md:mx-4 dark:bg-transparent">
                                        <img src="https://i.ibb.co/5vQnScs/6213813.png" alt="Feature logo" className="w-12 h-10" />
                                    </span>

                                    <div className="mt-4 md:ml-1 md:mt-0">
                                        <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-gray-900">Donor Rewards and Recognition</h1>

                                        <ul className="list-[circle] dark:text-gray-700 ml-6 mt-3">
                                            <li>Earn points for each donation</li>
                                            <li>Receive badges and certificates</li>
                                            <li>Get featured on our Hall of Fame</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* 4 card */}
                            <div className="p-6 bg-white bg-opacity-30 dark:bg-opacity-45 border rounded-xl border-r-gray-200 dark:border-gray-700 h-fit">
                                <div className="md:flex md:items-start md:-mx-4">
                                    <span className="inline-block p-2 border border-[#ff1493] rounded-xl md:mx-4 dark:bg-transparent">
                                        <img src="https://i.ibb.co/jHdSGQB/images.png" alt="Feature logo" className="w-16 h-10" />
                                    </span>

                                    <div className="mt-4 md:ml-1 md:mt-0">
                                        <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-gray-900">Educational Resources and Community Support</h1>

                                        <ul className="list-[circle] dark:text-gray-700 ml-6 mt-3">
                                            <li>Informative articles and FAQs</li>
                                            <li>Safety guidelines and tips</li>
                                            <li>Community forums and support groups</li>
                                            <li>Comprehensive resources</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;