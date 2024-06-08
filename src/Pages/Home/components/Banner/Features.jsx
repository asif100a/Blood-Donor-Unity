const Features = () => {
    return (
        <section className="bg-white dark:bg-gray-900 mt-16">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white lg:ml-20">Key features of our website</h1>

                <div className="mt-8 xl:mt-12 lg:flex lg:items-center lg:justify-center gap-6">
                    <div className="grid w-full grid-cols-1 gap-6 lg:w-1/2 xl:gap-16 md:grid-cols-2">
                        {/* 1 card */}
                        <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700 h-fit">
                            <div className="md:flex md:items-start md:-mx-4">
                                <span className="inline-block p-2 border border-orange-600 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                                    <img src="https://i.ibb.co/YhLSNTg/5065729.png" alt="Feature logo" className="w-16 h-10" />
                                </span>

                                <div className="mt-4 md:ml-1 md:mt-0">
                                    <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-white">Easy Donor Registration By Any Device</h1>

                                    <ul className="list-[circle] ml-6 mt-3">
                                        <li>Quick, Simplified and user-friendly registration process</li>
                                        <li>Mobile-friendly registration</li>
                                        <li>Secure data handling</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* 2 card */}
                        <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700 h-fit">
                            <div className="md:flex md:items-start md:-mx-4">
                                <span className="inline-block p-2 border border-green-500 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                                    <img src="https://i.ibb.co/0q9Rc9d/3430447.png" alt="Feature logo" className="w-10 h-10" />
                                </span>

                                <div className="mt-4 md:ml-1 md:mt-0">
                                    <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-white">Real-Time Donation Requests</h1>

                                    <ul className="list-[circle] ml-6 mt-3">
                                        <li>Instant alerts for urgent requests</li>
                                        <li>Geolocation-based requests</li>
                                        <li>Immediate response options</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* 3 card */}
                        <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700 h-fit">
                            <div className="md:flex md:items-start md:-mx-4">
                                <span className="inline-block p-2 border border-blue-500 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                                    <img src="https://i.ibb.co/5vQnScs/6213813.png" alt="Feature logo" className="w-12 h-10" />
                                </span>

                                <div className="mt-4 md:ml-1 md:mt-0">
                                    <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-white">Donor Rewards and Recognition</h1>

                                    <ul className="list-[circle] ml-6 mt-3">
                                        <li>Earn points for each donation</li>
                                        <li>Receive badges and certificates</li>
                                        <li>Get featured on our Hall of Fame</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* 4 card */}
                        <div className="p-6 border rounded-xl border-r-gray-200 dark:border-gray-700 h-fit">
                            <div className="md:flex md:items-start md:-mx-4">
                                <span className="inline-block p-2 border border-[#ff1493] rounded-xl md:mx-4 dark:text-white dark:bg-blue-500">
                                    <img src="https://i.ibb.co/jHdSGQB/images.png" alt="Feature logo" className="w-16 h-10" />
                                </span>

                                <div className="mt-4 md:ml-1 md:mt-0">
                                    <h1 className="text-xl font-medium text-gray-700 capitalize dark:text-white">Educational Resources and Community Support</h1>

                                    <ul className="list-[circle] ml-6 mt-3">
                                        <li>Informative articles and FAQs</li>
                                        <li>Safety guidelines and tips</li>
                                        <li>Community forums and support groups</li>
                                        <li>Comprehensive resources and support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:w-fit lg:justify-center">
                        <img className="w-[28rem] h-[28rem] flex-shrink-0 object-cover xl:w-[34rem] xl:h-[34rem] rounded-full" src="https://i.ibb.co/vvr10Cw/shutterstock-1586903512-1.jpg" alt="Blood donation" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;