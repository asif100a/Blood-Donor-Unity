import { useLoaderData } from "react-router-dom";

const BlogDetails = () => {
    const blog = useLoaderData();
    console.log(blog)
    const { title, image, content, posted_date, blogger } = blog;

    const newPostedDate = new Date(posted_date).toLocaleDateString('en-GB');

    return (
        <section className="bg-white dark:bg-gray-900 px-3 md:px-8 xl:px-24">
            <div className="container py-16 mx-auto text-center">
                <div className="w-full lg:max-w-xl mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white capitalize lg:text-4xl">{title}</h1>
                    {/* <p className="mt-6 text-gray-500 dark:text-gray-300">Blood donation is a simple, safe, and impactful way to contribute to your community. By setting aside just a small amount of time, you can make a significant difference in {"someone's"} life.</p> */}
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-col items-center md:items-start mt-6">
                            <p><span className="font-semibold">Blogger:</span> {blogger?.name}</p>
                            <p><span className="font-semibold">Email:</span> {blogger?.email}</p>
                        </div>
                        <p className="mt-6"><span className="font-semibold">Posted date:</span> {newPostedDate}</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-center gap-6 mt-10">
                    <img className="object-cover w-full max-h-[40rem] rounded-xl lg:w-[40rem]" src={image} alt="Blog image" />

                    <div className="text-start">


                        <p dangerouslySetInnerHTML={{ __html: content }}></p>
                    </div>
                </div>

                <div className="flex flex-col justify-start border w-fit">

                </div>
            </div>
        </section>
    );
};

export default BlogDetails;