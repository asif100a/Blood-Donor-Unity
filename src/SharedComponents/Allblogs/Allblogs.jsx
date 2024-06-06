import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpiner from "../LoadingSpiner/LoadingSpiner";
import { useState } from "react";
import Swal from "sweetalert2";

const Allblogs = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [currentStatus, setCurrentStatus] = useState('');

    const { data: blogs = [], isError, error, isPending, refetch } = useQuery({
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

    if (isPending) {
        return <LoadingSpiner />;
    }
    if (isError) {
        console.error(error);
    }

    // Publish the blog
    const handlePublishBlog = async (id, status) => {
        if (status === 'draft') {
            setCurrentStatus('published');
        }
        else if (status === 'published') {
            setCurrentStatus('draft');
        }
        console.log(currentStatus);

        // Update data to the database
        if (currentStatus) {
            try {
                const { data } = await axiosSecure.patch(`/blogs/${id}`, { status: currentStatus });
                console.log(data);
                if (data?.modifiedCount > 0) {
                    toast.success('Blog published successfully');
                    refetch();
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Delete the blog
    const handleDelete = (id) => {
        console.log(id);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.delete(`/blogs/${id}`);
                    console.log(data);
                    if (data?.deletedCount > 0) {
                        toast.success('Blog deleted successfully');
                        refetch();
                    }
                } catch (err) {
                    console.error(err);
                }


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                toast.error('You have canceled delete oparation')
            }
        });

    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {
                        blogs.map(blog => (
                            <div key={blog?._id} className="p-3 border-4 border-double border-green-600 rounded-xl flex flex-col flex-grow">
                                <div className="relative">
                                    <img className="object-cover object-center w-full h-40 rounded-lg lg:h-64" src={blog?.image} alt="Blog image" />

                                    <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-white bg-opacity-80 ">
                                        <p className="font-bold">{blog?.status}</p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                                        {blog?.title}
                                    </h1>

                                    {/* <div className="mt-2 text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{__html: blog?.content.split(0, 20)}}>
                                    </div> */}

                                    <div className="flex items-center justify-between mt-4">
                                        <Link to={''}><button className={`btn bg-white border-none shadow-none hover:bg-white`}><FaRegEdit className='h-5 w-5 hover:transform hover:scale-125 text-green-600' /></button></Link>

                                        <button
                                            onClick={() => handleDelete(blog?._id)}
                                            className={`btn bg-white border-none shadow-none hover:bg-white`}><MdDeleteForever className='h-6 w-6 hover:transform hover:scale-125 text-red-600' /></button>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={() => handlePublishBlog(blog?._id, blog?.status)}
                                            className={`btn w-full text-[16px] font-bold text-white ${blog?.status === 'draft' ? 'bg-green-500 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'}`}>{blog?.status === 'draft' ? 'Publish' : 'Unpublish'}</button>
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