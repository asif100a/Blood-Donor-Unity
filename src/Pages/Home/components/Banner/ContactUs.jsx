const ContactUs = () => {
    return (
        <div className="mt-16 p-6">
            <div className="ml-20">
                <div className="">
                    <h1 className="text-4xl font-semibold">Contact Us</h1>
                </div>
                <form className="space-y-6 mt-16 max-w-xs" action="#" method="POST">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder='Your name'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder='Your email'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                            Message
                        </label>
                        <div className="mt-2">
                            <textarea id="message"
                                name="message"
                                type="text"
                                placeholder='Your message'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" 
                                ></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;