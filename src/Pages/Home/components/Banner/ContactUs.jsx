const ContactUs = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container lg:px-28 py-6 lg:py-12 px-6 mx-auto">
                <div>
                    <div className="mb-6">
                        <h1 className="text-3xl lg:text-4xl font-semibold text-center md:text-start">Contact Us</h1>
                    </div>

                    <div className="flex justify-between gap-12">
                        <div className="text-center md:text-start md:w-1/2">
                            <h1 className="mt-2 text-lg md:text-xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Chat to us</h1>

                            <p className="mt-3 text-gray-500 dark:text-gray-400">You can contact us via email, live chat, ofice, phone.</p>
                        </div>

                        <div className="hidden lg:block lg:w-1/2">
                            <h1 className="mt-2 text-lg md:text-xl font-semibold text-gray-800 lg:text-3xl dark:text-white">Send message to us</h1>

                            <p className="mt-3 text-gray-500 dark:text-gray-400">If you have any questions, feel free to message to us:</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 text-center md:text-start">
                        <div>
                            <span className="inline-block p-3 text-orange-500 rounded-full bg-white border-2 border-green-500 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </span>

                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Email</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
                            <a href="#" className="mt-2 text-sm text-green-500 dark:text-blue-400">blooddonatorUnity@gmail.com</a>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-orange-500 rounded-full bg-white border-2 border-green-500 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </span>

                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Live chat</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
                            <a href="#" className="mt-2 text-sm text-green-500 dark:text-blue-400">Start new chat</a>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-orange-500 rounded-full bg-white border-2 border-green-500 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </span>

                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Office</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Come say hello at our office HQ.</p>
                            <a href="#" className="mt-2 text-sm text-green-500 dark:text-blue-400">100 Smith Street Collingwood VIC 3066 AU</a>
                        </div>

                        <div>
                            <span className="inline-block p-3 text-orange-500 rounded-full bg-white border-2 border-green-500 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </span>

                            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">Phone</h2>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>
                            <a href="#" className="mt-2 text-sm text-green-500 dark:text-blue-400">+1 (555) 000-0000</a>
                        </div>
                    </div>

                    <div className="lg:hidden block text-center">
                        <h1 className="mt-2 text-xl font-semibold text-gray-800 md:text-xl dark:text-white">Send message to us</h1>

                        <p className="mt-3 text-gray-500 dark:text-gray-400">If you have any questions, feel free to message to us:</p>
                    </div>

                    <div className="p-4 md:py-6 rounded-lg bg-white border-2 border-dashed border-orange-500 md:p-8">
                        <form>
                            <div className="-mx-2 md:items-center md:flex">
                                <div className="flex-1 px-2">
                                    <label className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200 pl-3">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-green-500 rounded-full dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-500 dark:focus:border-blue-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>

                                <div className="flex-1 px-2 mt-4 md:mt-0">
                                    <label className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200 pl-3">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-green-500 rounded-full dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-500 dark:focus:border-blue-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200 pl-3">Email address</label>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-green-500 rounded-full dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-500 dark:focus:border-blue-400 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>

                            <div className="w-full mt-4">
                                <label className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200 pl-3">Message</label>
                                <textarea
                                    className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-green-500 rounded-xl md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    placeholder="Send your message"
                                ></textarea>
                            </div>

                            <button type='submit' className="mt-6 relative rounded-full w-full px-5 py-2 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Send message</span>
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;