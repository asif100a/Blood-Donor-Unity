import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Blood.png';
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
    const [validationError, setValidationError] = useState('');
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
        setValidationError('');
        setConfirmPasswordError('');

        if (data?.blood_group === 'choose_blood') {
            return setValidationError('Please choose 1 category');
        }
        else if (data?.district === 'choose_district') {
            return setValidationError('Please choose 1 category');
        }
        else if (data?.upazila === 'choose_upazila') {
            return setValidationError('Please choose 1 category');
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
            if(err?.message === 'Firebase: Error (auth/email-already-in-use).') {
                return toast.error('You have already registered');
            }
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center items-center gap-2">
                    <img src={logo} alt="" className="w-[72px] h-[80px]" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-medium leading-9 tracking-tight text-gray-900">
                    Register your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Your name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder='Your name'
                                {...register("name", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.name && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder='Your email'
                                {...register("email", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.email && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                            Upload your image
                        </label>
                        <div className="mt-2">
                            <input
                                id="image"
                                name="image"
                                type="file"
                                placeholder='Your image'
                                {...register("image", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.image && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                            Select your blood group
                        </label>
                        <div className="mt-2">
                            <select
                                name='blood_group'
                                {...register("blood_group", { required: true })}
                                defaultValue={'choose_blood'}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                                <option disabled value={'choose_blood'}>Choose your blood group</option>
                                {
                                    blooGroup.map((group, i) => <option key={i} value={group}>{group}</option>)
                                }
                            </select>
                            {validationError && <p className="text-orange-600">{validationError}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                            Select your district
                        </label>
                        <div className="mt-2">
                            <select
                                name='district'
                                {...register("district", { required: true })}
                                onChange={(e) => handleSelectDistrict(e)}
                                defaultValue={'choose_district'}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                                <option disabled value={'choose_district'}>Choose your district</option>
                                {
                                    districts.map(district => <option key={district?.id} value={district?.name}>{district?.name}</option>)
                                }
                            </select>
                            {validationError && <p className="text-orange-600">{validationError}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                            Select your upazila
                        </label>
                        <div className="mt-2">
                            <select
                                name='upazila'
                                {...register("upazila", { required: true })}
                                defaultValue={'choose_upazila'}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                                <option disabled value={'choose_upazila'}>Choose your upazila</option>
                                {
                                    selectedUpazilas?.map((upazila, i) => <option key={i} value={upazila?.name}>{upazila?.name}</option>)
                                }
                            </select>
                            {validationError && <p className="text-orange-600">{validationError}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.password && <span className="text-orange-600">This field is required</span>}
                            {errors.password?.type === 'pattern' && <p className="text-orange-600">Password must be at least 6 character, 1 uppercase, 1 lowercas, 1 number and 1 special character</p>}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirm_password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm confirm_password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                placeholder='Confirm password'
                                {...register("confirm_password", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.confirm_password && <span className="text-orange-600">This field is required</span>}
                            {confirmPasswordError && <p className='text-orange-600'>{confirmPasswordError}</p>}
                        </div>
                    </div>

                    <div>
                        <input
                            type="submit"
                            value={'Register now'}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        />
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500 space-x-2">
                    <span>Already registered to {'"Blood Donator Unity"'}?</span>
                    <Link to={'/login'} className="font-medium leading-6 text-indigo-600 hover:text-indigo-500 hover:underline">
                        Login now.
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;