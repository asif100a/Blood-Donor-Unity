import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Blood_Donor_Unity.png';
import districts from './components/district.json';
import upazilas from './components/upazila.json';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';

const Register = () => {
    const blooGroup = [' A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazilas, setSelectedUpazilas] = useState([]);
    const [bloodFieldError, setBloodFieldError] = useState('');
    const [districtFieldError, setDistrictFieldError] = useState('');
    const [upazilaFieldError, setUpazilaFieldError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const axiosPublic = useAxiosPublic();
    const { registerUser } = useAuth();
    const navigate = useNavigate();

    // Image hostring url
    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_API}`

    // Get the selected district for the upazila selection
    const handleSelectDistrict = (e) => {
        const selectedValue = e.target.value;
        setSelectedDistrict(selectedValue);
    };

    useEffect(() => {
        const findDistrict = districts.find(district => district?.name === selectedDistrict);
        console.log(findDistrict);

        // Filter the upazilas based on the selected district
        const filteredUpazilas = upazilas.filter(upazila => upazila?.district_id === findDistrict?.id);
        setSelectedUpazilas(filteredUpazilas);

    }, [selectedDistrict]);

    console.log(selectedUpazilas);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();


    const onSubmit = async (data) => {
        console.table(data);
        // Reset the validation error
        setBloodFieldError('');
        setDistrictFieldError('');
        setUpazilaFieldError('');
        setConfirmPasswordError('');

        if (data?.blood_group === 'choose_blood') {
            return setBloodFieldError('Please choose 1 category');
        }
        else if (data?.district === 'choose_district') {
            return setDistrictFieldError('Please choose 1 category');
        }
        else if (data?.upazila === 'choose_upazila') {
            return setUpazilaFieldError('Please choose 1 category');
        }
        else if (data?.password !== data?.confirm_password) {
            return setConfirmPasswordError('Please give confirm password as the same password');
        }

        console.log(data?.image[0])
        const imageFile = data?.image[0];

        // Upload the image on the imgBB & get the image url
        const { data: imgHostingData } = await axiosPublic.post(imageHostingUrl, { image: imageFile }, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const hostedImage = imgHostingData?.data?.display_url;

        const email = data?.email;
        const password = data?.password;
        const name = data?.name;
        const date = new Date();
        const role = 'donor';
        const status = 'active';

        // Register user to the firebase
        try {
            const result = await registerUser(email, password);
            await updateProfile(result?.user, {
                displayName: name,
                photoURL: hostedImage
            })
            console.log(result);

            // Save user data to the database
            const { data: userData } = await axiosPublic.post('/users', { ...data, image: hostedImage, registerDate: date, role, status });
            console.log(userData);
            if (userData?.insertedId) {
                reset();
                toast.success('You have registered successfully');
                navigate('/');
            }

        } catch (err) {
            console.error(err.message);
            if (err?.message === 'Firebase: Error (auth/email-already-in-use).') {
                return toast.error('You have already registered');
            }
        }
    }

    return (
        <div className="dark:bg-[#292929] flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center items-center gap-2">
                    <img src={logo} alt="" className="block w-auto h-16" />
                </div>
                <h2 className="mt-3 text-center text-3xl font-medium leading-9 tracking-tight text-gray-900 dark:text-gray-100 capitalize">
                    Register your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[880px] border-2 border-dashed border-orange-600 sm:p-6 p-3 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6" action="#" method="POST">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Your name
                        </label>
                        <div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder='Your name'
                                {...register("name", { required: true })}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.name && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Email address
                        </label>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder='Your email'
                                {...register("email", { required: true })}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.email && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Upload your image
                        </label>
                        <div>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                placeholder='Your image'
                                {...register("image", { required: true })}
                                className="block w-full rounded-full border py-1.5 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.image && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Select your blood group
                        </label>
                        <div>
                            <select
                                name='blood_group'
                                {...register("blood_group", { required: true })}
                                defaultValue={'choose_blood'}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4">
                                <option disabled value={'choose_blood'}>Choose your blood group</option>
                                {
                                    blooGroup.map((group, i) => <option key={i} value={group}>{group}</option>)
                                }
                            </select>
                            {bloodFieldError && <p className="text-orange-600">{bloodFieldError}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Select your district
                        </label>
                        <div>
                            <select
                                name='district'
                                {...register("district", { required: true })}
                                onChange={(e) => handleSelectDistrict(e)}
                                defaultValue={'choose_district'}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4">
                                <option disabled value={'choose_district'}>Choose your district</option>
                                {
                                    districts.map(district => <option key={district?.id} value={district?.name}>{district?.name}</option>)
                                }
                            </select>
                            {districtFieldError && <p className="text-orange-600">{districtFieldError}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Select your upazila
                        </label>
                        <div>
                            <select
                                name='upazila'
                                {...register("upazila", { required: true })}
                                defaultValue={'choose_upazila'}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4">
                                <option disabled value={'choose_upazila'}>Choose your upazila</option>
                                {
                                    selectedUpazilas?.map((upazila, i) => <option key={i} value={upazila?.name}>{upazila?.name}</option>)
                                }
                            </select>
                            {upazilaFieldError && <p className="text-orange-600">{upazilaFieldError}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                                Password
                            </label>
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder='Password'
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 32,
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                                })}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.password && <span className="text-orange-600">This field is required</span>}
                            {errors.password?.type === 'pattern' && <p className="text-orange-600">Password must be at least 6 character, 1 uppercase, 1 lowercas, 1 number and 1 special character</p>}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                                Confirm confirm_password
                            </label>
                        </div>
                        <div>
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                placeholder='Confirm password'
                                {...register("confirm_password", { required: true })}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.confirm_password && <span className="text-orange-600">This field is required</span>}
                            {confirmPasswordError && <p className='text-orange-600'>{confirmPasswordError}</p>}
                        </div>
                    </div>

                    <div className='col-span-1 sm:col-span-2 text-center'>
                        <button type='submit' className="relative rounded-full w-full sm:w-[402px] px-5 py-2 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Register now</span>
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300 space-x-2">
                    <span>Already registered to {'"Blood Donator Unity"'}?</span>
                    <Link to={'/login'} className="font-medium leading-6 text-green-600 hover:text-green-500 hover:underline">
                        Login now.
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;