import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Allblogs = () => {
    const axiosPublic = useAxiosPublic();

    const { data: blogs = [], isError, error, isPending } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/blogs');
            return data;
        }
    });
    console.log(blogs);

    // const blogContent = <>
    //     <div dangerouslySetInnerHTML={blogs}></div>
    // </>;

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {
                        blogs.map(blog => (
                            <div key={blog?._id}>
                                <img className="object-cover object-center w-full h-64 rounded-lg lg:h-80" src={blog?.image} alt="Blog image" />

                                <div className="mt-8">
                                    <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                                        {blog?.title}
                                    </h1>

                                    <div className="mt-2 text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{__html: blog?.content.split(0, 20)}}>
                                        {/* {blog?.content} */}
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div>
                                            <a href="#" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500">
                                                John snow
                                            </a>

                                            <p className="text-sm text-gray-500 dark:text-gray-400">February 1, 2022</p>
                                        </div>

                                        <a href="#" className="inline-block text-blue-500 underline hover:text-blue-400">Read more</a>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Allblogs;