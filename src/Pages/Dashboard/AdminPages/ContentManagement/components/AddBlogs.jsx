import { useForm } from "react-hook-form";
import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import useUploadImage from "../../../../../Hooks/useUploadImage";
import useAuth from "../../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {
    const { user } = useAuth();
    const [validationError, setValidationError] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const imageUploader = useUploadImage();

    const editorConfig = {
        readonly: false,
        height: '330px'
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        console.table(data);
        // Reset the validation error
        setValidationError('');

        if (content === '') {
            return setValidationError('Please fill up this field');
        }
        console.log('content:', typeof content);

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
            const { data: insertedData } = await axiosSecure.post('/blogs', {
                ...data,
                image: image,
                content,
                status,
                posted_date,
                blogger
            });
            console.log(insertedData);
            if (insertedData?.insertedId) {
                toast.success('You have created your blog successfully');
                reset();
                setContent('');
                navigate('/dashboard/content_management');
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="m-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl dark:text-gray-100 font-semibold text-center capitalize my-6">Create your blog</h1>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[880px] border-2 border-dashed border-orange-600 sm:p-6 p-3 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
                    <div className="flex flex-col sm:flex-row justify-between gap-6">
                        <div className="w-full">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder='Title of the blog'
                                    {...register("title", { required: true })}
                                    className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                                />
                                {errors.title && <span className="text-orange-600">Please fill up this field</span>}
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                Image
                            </label>
                            <div className="mt-2">
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    placeholder='Thumbnail image'
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
                                <span className="relative">Create the blog</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlogs;