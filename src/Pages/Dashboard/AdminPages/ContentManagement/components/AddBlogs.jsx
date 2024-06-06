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
            if(insertedData?.insertedId) {
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
        <div>
            <h1 className="text-4xl font-semibold text-center my-6">Create your blog</h1>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
                    <div className="flex justify-between gap-6">
                        <div className="w-full">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder='Title of the blog'
                                    {...register("title", { required: true })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
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
                        // placeholder={'Write your blog'}
                        />
                        {validationError && <p className="text-orange-600">{validationError}</p>}
                    </div>
                    <div>
                        <input
                            type="submit"
                            value={'Create the blog'}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlogs;