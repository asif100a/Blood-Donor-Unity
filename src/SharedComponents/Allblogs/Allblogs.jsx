import PropTypes from "prop-types";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaAngleDown, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpiner from "../LoadingSpiner/LoadingSpiner";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import './allBlogs.css';
import useRefresh from "../../Hooks/useRefresh";
import { FaArrowRightLong } from "react-icons/fa6";

const Allblogs = ({ volunteer, admin }) => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const refresh = useRefresh();
    // console.log(volunteer);

    const [blogs, setBlogs] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [sortedValue, setSortedValue] = useState('');

    useEffect(() => {
        BlogData();

    }, [sortedValue]);

    const BlogData = async () => {
        const { data } = await axiosPublic.get(`/blogs?status=${sortedValue}`);
        console.log(data);
        setBlogs(data);
        setIsPending(false);
    }

    if (isPending) {
        return <LoadingSpiner />;
    }

    // Sort the blog
    const handleDropdown = (status) => {
        console.log(status);
        setSortedValue(status);
        console.log('sorted value:', sortedValue)
    };

    // Publish the blog
    const handlePublishBlog = async (id, status) => {
        const newStatus = status === 'draft' ? 'published' : 'draft';

        console.log('status:', status)
        console.log('newStatus:', newStatus);

        // Update data to the database
        try {
            const { data } = await axiosSecure.patch(`/blogs/${id}`, { status: newStatus });
            console.log(data);
            if (data?.modifiedCount > 0) {
                // Show the success message after finishing the action
                status === 'draft' ? toast.success('Blog published successfully') : toast.success('Blog drafted successfully')

                BlogData();
            }
        } catch (err) {
            console.error(err);
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
                        const updatedData = refresh(id, blogs);
                        setBlogs(updatedData);
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
        <section className="bg-white dark:bg-inherit">
            <div className="container px-6 py-10 mx-auto">

                <div className={`mb-12 text-center ${admin && 'flex flex-col md:flex-row md:items-center md:text-start'}`}>
                    <div className="dropdown w-full md:w-1/2">
                        <button className="relative inline-flex items-center justify-center p-4 px-12 py-3 overflow-hidden font-medium text-red-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                                <FaAngleDown className="w-6 h-6" />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-red-600 transition-all duration-300 transform group-hover:translate-x-full ease">Sort by</span>
                            <span className="relative invisible">Sort by</span>
                        </button>

                        <ul tabIndex={0} className={`mt-3 z-[1] left-6 md:left-16 lg:left-48 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 dark:text-gray-100 ${volunteer && 'left-48'}`}>
                            <li onClick={() => handleDropdown('draft')}><a>draft</a></li>
                            <li onClick={() => handleDropdown('published')}><a>published</a></li>
                        </ul>
                    </div>

                    <div className={`my-6 text-center md:text-end md:w-1/2 ${volunteer && 'hidden'}`}>
                        <Link to={'/dashboard/content_management/add_blog'}><button className="relative inline-flex items-center justify-center p-4 px-12 py-3 overflow-hidden font-medium text-green-600 transition duration-300 ease-out border-2 border-orange-600 rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange-600 group-hover:translate-x-0 ease">
                                <FaArrowRightLong className="w-6 h-6" />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-green-600 transition-all duration-300 transform group-hover:translate-x-full ease">Add blog</span>
                            <span className="relative invisible">Sort by</span>
                        </button></Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {
                        blogs.map(blog => (
                            <div key={blog?._id} className="p-3 border-4 border-double border-green-600 rounded-xl flex flex-col flex-grow">
                                <div className="relative">
                                    <img className="object-cover object-center w-full h-40 rounded-lg lg:h-64" src={blog?.image} alt="Blog image" />

                                    <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-white bg-opacity-80  dark:bg-black dark:bg-opacity-40">
                                        <p className="font-bold dark:text-gray-100">{blog?.status}</p>
                                    </div>
                                </div>

                                <div className="mt-0">
                                    <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                                        {blog?.title}
                                    </h1>

                                    <div className="flex items-center justify-between mt-2">
                                        <Link to={`/dashboard/content_management/edit_blog/${blog._id}`}>
                                            <button className={`btn bg-white dark:bg-inherit border-none shadow-none hover:bg-white hover:dark:bg-inherit`}>
                                                <FaRegEdit className='h-5 w-5 hover:transform hover:scale-125 text-green-600' />
                                            </button>
                                        </Link>

                                        <button
                                            onClick={volunteer ? '' : () => handleDelete(blog?._id)}
                                            className={`${volunteer ? 'opacity-60 cursor-not-allowed' : 'btn'} bg-white dark:bg-inherit border-none shadow-none hover:bg-white hover:dark:bg-inherit`}><MdDeleteForever className='h-6 w-6 hover:transform hover:scale-125 text-red-600' /></button>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={volunteer ? null : () => handlePublishBlog(blog?._id, blog?.status)}
                                            className={`${volunteer ? 'cursor-not-allowed h-[3rem] min-h-[3rem] rounded-md opacity-80' : 'btn'} w-full text-[16px] font-bold text-white ${blog?.status === 'draft' ? 'bg-green-500 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'}`}>{blog?.status === 'draft' ? 'Publish' : 'Unpublish'}</button>
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

Allblogs.propTypes = {
    volunteer: PropTypes.bool,
    admin: PropTypes.bool,
};

export default Allblogs;