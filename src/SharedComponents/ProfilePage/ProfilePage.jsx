import PropTypes from 'prop-types';
import { FaUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { GiHomeGarage } from "react-icons/gi";
import { MdHomeWork, MdInsertPhoto } from "react-icons/md";
import useLoggedUser from '../../Hooks/useLoggedUser';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useUploadImage from '../../Hooks/useUploadImage';

const ProfilePage = () => {
    const user = useLoggedUser();
    const axiosSecure = useAxiosSecure();
    const uploadImage = useUploadImage();

    const blooGroup = [' A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const [isClicked, setIsClicked] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazilas, setSelectedUpazilas] = useState([]);
    const [bloodFieldError, setBloodFieldError] = useState('');
    const [districtFieldError, setDistrictFieldError] = useState('');
    const [upazilaFieldError, setUpazilaFieldError] = useState('');

    // Handle the Edit profile button
    const handleEdit = () => {
        console.log('clicked')
        setIsClicked(true);
    };

    // Fetch district and upazila data
    useEffect(() => {
        fetch('/district.json')
            .then(res => res.json())
            .then(data => setDistricts(data));

        fetch('/upazila.json')
            .then(res => res.json())
            .then(data => setUpazilas(data));
    }, []);


    useEffect(() => {
        // Find the selected district's info
        const findedDistrict = districts.find(district => district?.name === selectedDistrict);
        console.log(findedDistrict);

        // Filter the specific upazilas for the district
        const filteredUpazilas = upazilas.filter(upazila => upazila?.district_id === findedDistrict?.id);
        setSelectedUpazilas(filteredUpazilas);
    }, [districts, selectedDistrict, upazilas]);

    console.log(selectedUpazilas);

    // Select the specific district to show it's upazilas
    const handleSelectDistrict = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const {
        register,
        handleSubmit,
        // formState: { errors },
        // reset
    } = useForm();

    const onSubmit = async (data) => {
        // Reset the validation error
        setBloodFieldError('');
        setDistrictFieldError('');
        setUpazilaFieldError('');

        if (data?.blood_group === 'choose_blood') {
            return setBloodFieldError('Please choose 1 category');
        }
        else if (data?.district === 'choose_district') {
            return setDistrictFieldError('Please choose 1 category');
        }
        else if (data?.upazila === 'choose_upazila') {
            return setUpazilaFieldError('Please choose 1 category');
        }

        console.table(data);




        // Save the changes to the database
        try {
            // Upload the image on imgBB
            const { data: imageData } = await uploadImage(data?.image[0]);
            const uploadedImage = imageData?.display_url;
            console.log(uploadedImage);

            const { data: updatedData } = await axiosSecure.put(`/users/${user?._id}`, { ...data, image: uploadedImage });
            console.log(updatedData);
            if (updatedData?.modifiedCount > 0) {
                toast.success('Your profile successfully updated');
                setIsClicked(false);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="bg-white dark:bg-gray-800">
            <div className="container px-6 py-8 mx-auto">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 capitalize text-center dark:text-gray-100">My profile</h2>
                </div>

                <div className="max-w-xl mt-12 mx-auto">
                    <div className="px-6 py-4 transition-colors duration-200 transform rounded-lg border">
                        <div className="text-center">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-orange-600 ring-offset-base-100 ring-offset-2">
                                    <img src={user?.image} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <button onClick={handleEdit} className={`${isClicked && 'hidden'} relative rounded-full px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300`}>
                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                <span className="relative">Edit profile</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
                            <div className="flex items-center h-[36px] space-x-3 pb-2">
                                <div className="mt-2">
                                    <FaUser className="text-lg" />
                                </div>

                                <div className="mt-2 flex gap-2 items-center w-full">
                                    <span className="font-semibold">Name:</span>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        readOnly
                                        value={user?.name}
                                        className={`block ${isClicked && 'hidden'} w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
                                    />
                                    {
                                        isClicked && (
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                defaultValue={user?.name}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                {...register("name", { required: true })}
                                            />
                                        )
                                    }
                                </div>
                            </div>

                            <div className={`flex ${isClicked && 'hidden'} items-center h-[36px] space-x-3 pb-2`}>
                                <div className="mt-2">
                                    <HiOutlineMail className="text-2xl" />
                                </div>

                                <div className="mt-2 flex gap-2 items-center w-full">
                                    <span className="font-semibold">Email:</span>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        readOnly
                                        value={user?.email}
                                        className={`block ${isClicked && 'hidden'} w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
                                    />
                                    {/* {
                                        isClicked && (
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                defaultValue={user?.email}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                {...register("email", { required: true })}
                                            />
                                        )
                                    } */}
                                </div>
                            </div>

                            {
                                isClicked && (
                                    <div className="flex items-center h-[36px] space-x-3 pb-2">
                                        <div className="mt-2">
                                            <MdInsertPhoto className="text-lg" />
                                        </div>
                                        <div className="mt-2 flex gap-2 items-center w-full">
                                            <span className="font-semibold">Image:</span>

                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                {...register("image", { required: true })}
                                            />
                                        </div>
                                    </div>
                                )
                            }

                            <div className="flex items-center h-[36px] space-x-3 pb-2">
                                <div className="mt-2">
                                    <span>🩸</span>
                                </div>

                                <div className="mt-2 flex gap-2 items-center w-full">
                                    <p className="font-semibold flex gap-1"><span>Blood</span> <span>group:</span></p>
                                    <input
                                        id="blood_group"
                                        name="blood_group"
                                        type="text"
                                        readOnly
                                        value={user?.blood_group}
                                        className={`block ${isClicked && 'hidden'} w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
                                    />
                                    {
                                        isClicked && (
                                            <select
                                                name='blood_group'
                                                {...register("blood_group", { required: true })}
                                                defaultValue={user?.blood_group}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                                                <option disabled value={'choose_blood'}>Choose your blood group</option>
                                                {
                                                    blooGroup.map((group, i) => <option key={i} value={group}>{group}</option>)
                                                }
                                            </select>
                                        )
                                    }
                                    {bloodFieldError && <p className="text-orange-600">{bloodFieldError}</p>}
                                </div>
                            </div>

                            <div className="flex items-center h-[36px] space-x-3 pb-2">
                                <div className="mt-2">
                                    <GiHomeGarage className="text-xl" />
                                </div>

                                <div className="mt-2 flex gap-2 items-center w-full">
                                    <span className="font-semibold">District:</span>
                                    <input
                                        id="district"
                                        name="district"
                                        type="text"
                                        readOnly
                                        value={user?.district}
                                        className={`block ${isClicked && 'hidden'} w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
                                    />

                                    {
                                        isClicked && (
                                            <select
                                                name='district'
                                                {...register("district", { required: true })}
                                                onChange={(e) => handleSelectDistrict(e)}
                                                defaultValue={user?.district}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                                                <option disabled value={'choose_district'}>Choose your district</option>
                                                {
                                                    districts.map(district => <option key={district?.id} value={district?.name}>{district?.name}</option>)
                                                }
                                            </select>
                                        )
                                    }
                                    {districtFieldError && <p className="text-orange-600">{districtFieldError}</p>}
                                </div>
                            </div>

                            <div className="flex items-center h-[36px] space-x-3 pb-2">
                                <div className="mt-2">
                                    <MdHomeWork className="text-xl" />
                                </div>

                                <div className="mt-2 flex gap-2 items-center w-full">
                                    <span className="font-semibold">Upazila:</span>
                                    <input
                                        id="upazila"
                                        name="upazila"
                                        type="text"
                                        readOnly
                                        value={user?.upazila}
                                        className={`block ${isClicked && 'hidden'} w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3`}
                                    />
                                    {
                                        isClicked && (
                                            <select
                                                name='upazila'
                                                {...register("upazila", { required: true })}
                                                defaultValue={'user?.upazila'}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                                                <option disabled value={'choose_upazila'}>Choose your upazila</option>
                                                <option disabled value={'user?.upazila'}>{user?.upazila}</option>
                                                {
                                                    selectedUpazilas?.map((upazila, i) => <option key={i} value={upazila?.name}>{upazila?.name}</option>)
                                                }
                                            </select>
                                        )
                                    }
                                    {upazilaFieldError && <p className="text-orange-600">{upazilaFieldError}</p>}
                                </div>
                            </div>

                            <div className={`text-center ${isClicked ? ' justify-center' : 'hidden'}`}>
                                <button className="relative rounded-full px-5 py-2.5 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                    <input type="submit" value={'Update'} className='relative hover:cursor-pointer' />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

ProfilePage.propTypes = {

};

export default ProfilePage;