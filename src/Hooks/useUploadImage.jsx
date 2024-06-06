import useAxiosPublic from "./useAxiosPublic";

const useUploadImage = () => {
    const axiosPublic = useAxiosPublic();
    // Image hostring url
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_API}`

    const handleUploadImage = async (uploadedImage) => {
        console.log(uploadedImage)
        const formData = new FormData();
        formData.append('image', uploadedImage)

        const { data } = await axiosPublic.post(imageHostingUrl, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        return data;
    };
    
    return handleUploadImage;
};

export default useUploadImage;