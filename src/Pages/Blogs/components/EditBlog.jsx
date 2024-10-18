import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import useUploadImage from '../../../Hooks/useUploadImage'
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpiner from "../../../SharedComponents/LoadingSpiner/LoadingSpiner";
import useLoggedUser from "../../../Hooks/useLoggedUser";

const EditBlog = () => {
    // States
    const [blogData, setBlogData] = useState([]);
    const [validationError, setValidationError] = useState('');
    const [blogTitleError, setBlogTitleError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // User info
    const { user } = useAuth();
    const userRole = useLoggedUser();
    console.log(userRole);
    // Hooks
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Jadit content handling
    const editor = useRef(null);
    const [content, setContent] = useState('');
    // image uploader hook
    const imageUploader = useUploadImage();

    const editorConfig = {
        readonly: false,
        height: '330px'
    };

    // Get specific id to show default data
    const { id } = useParams();
    console.log(id);
    // Fetch the data
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axiosSecure.get(`${import.meta.env.VITE_URL}/blogs/${id}`);
            setBlogData(data);
            setContent(data?.content);
            setIsLoading(false);
        };

        fetchData();
    }, []);
    console.log(blogData);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        console.table(data);
        // Reset the validation error
        setBlogTitleError('');
        setValidationError('');

        if (e.target.title.value === '') {
            return setBlogTitleError('Please fill up this field');
        }

        if (content === '') {
            return setValidationError('Please fill up this field');
        }
        console.log('content:', typeof content);

        const title = e.target.title.value;
        console.log(title);

        // Upload the image on the imgBB
        try {
            const { data: imageData } = await imageUploader(data?.image[0]);
            const image = imageData?.display_url;
            console.log(image);

            const status = 'draft';
            const name = user?.displayName;
            const email = user?.email;
            const blogger = { name, email };
            const posted_date = new Date();

            // Save data to the database
            const { data: insertedData } = await axiosSecure.put(`/blogs/edit-blog/${id}`, {
                ...data,
                title,
                image: image,
                content,
                status,
                posted_date,
                blogger
            });
            console.log(insertedData);
            if (insertedData?.modifiedCount > 0) {
                toast.success('You have updated your blog successfully');
                navigate(userRole.role === 'admin' ? '/dashboard/content_management' : '/dashboard/content_manage_vol');
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="m-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl dark:text-gray-100 font-semibold text-center my-6 capitalize">Update the blog</h1>

            {
                isLoading ? (
                    <LoadingSpiner />
                ) : (
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[880px] border-2 border-dashed border-orange-600 sm:p-6 p-3 rounded-xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
                            <div className="flex flex-col sm:flex-row justify-between gap-6">
                                <div className="w-full">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            defaultValue={blogData?.title}
                                            className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                                        />
                                        {blogTitleError && <p className="text-orange-600">{blogTitleError}</p>}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                        Image
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            {...register("image", { required: true })}
                                            className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                                        />
                                        {errors.image && <span className="text-orange-600">Please fill up this field</span>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    config={editorConfig}
                                    tabIndex={1} // tabIndex of textarea
                                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                />
                                {validationError && <p className="text-orange-600">{validationError}</p>}
                            </div>
                            <div>
                                <div className='col-span-1 sm:col-span-2 text-center'>
                                    <button type='submit' className="relative rounded-full w-full sm:w-[402px] px-5 py-2 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                        <span className="relative">Update the blog</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default EditBlog;