import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import LoadingSpiner from "../../SharedComponents/LoadingSpiner/LoadingSpiner";

const Blogs = () => {
    const axiosPublic = useAxiosPublic();

    const { data: blogs = [], isPending } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/published-blogs');
            return data;
        }
    });
    console.log(blogs);

    if (isPending) {
        return <LoadingSpiner />
    }

    return (
        <div className="px-6 lg:px-24 dark:bg-[#292929] min-h-[calc(100vh-389px)] py-3 md:py-6 dark:text-gray-100">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center capitalize mb-3 md:mb-6">Read your favorite blogs</h1>
            <p className="text-center text-base max-w-3xl mx-auto">Stay informed and inspired with our dedicated blog on blood donation. Discover heartwarming stories from donors and recipients, get the latest news and research on blood donation, and find valuable tips on how you can make a difference. Join our community and learn how your donation can save lives.</p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 mt-6 lg:mt-16">
                {
                    blogs?.map(blog => (
                        <div key={blog?._id} className="p-3 border-4 border-double border-green-600 rounded-xl flex flex-col flex-grow">
                            <div className="relative">
                                <img className="object-cover object-center w-full h-40 rounded-lg lg:h-64" src={blog?.image} alt="Blog image" />

                                <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-40">
                                    <p className="font-bold">Blog</p>
                                </div>
                            </div>

                            <div className="mt-0">
                                <h1 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100 h-24">
                                    {blog?.title}
                                </h1>

                            </div>

                            <div>
                                <Link to={`/blog-details/${blog?._id}`}>
                                    <button className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-green-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-200 group">
                                        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-green-600 group-hover:h-full"></span>
                                        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                        <span className="relative w-full text-left transition-colors text-orange-600 duration-200 ease-in-out group-hover:text-white">Read the blog</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
                {/* {
                   convetedBlogs && convetedBlogs?.map((convetedBlog, i) => (
                        <div key={i}>
                            <p>{convetedBlog.snippet}</p>
                        </div>
                    ))
                } */}
            </div>
        </div>
    );
};

export default Blogs;