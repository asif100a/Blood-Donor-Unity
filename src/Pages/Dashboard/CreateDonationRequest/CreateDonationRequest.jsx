import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateDonationRequest = () => {
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        fetch('/district.json')
            .then(res => res.json())
            .then(data => setDistricts(data));
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        console.table(data);
    };

    return (
        <div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="requester_name" className="block text-sm font-medium leading-6 text-gray-900">
                            Rrequester name
                        </label>
                        <div className="mt-2">
                            <input
                                id="requester_name"
                                name="requester_name"
                                type="text"
                                placeholder='Rrequester name'
                                {...register("requester_name", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.requester_name && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="requester_email" className="block text-sm font-medium leading-6 text-gray-900">
                            Requester email
                        </label>
                        <div className="mt-2">
                            <input
                                id="requester_email"
                                name="requester_email"
                                type="email"
                                placeholder='Requester email'
                                {...register("requester_email", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.requester_email && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="recipient_name" className="block text-sm font-medium leading-6 text-gray-900">
                            Recipient name
                        </label>
                        <div className="mt-2">
                            <input
                                id="recipient_name"
                                name="recipient_name"
                                type="file"
                                placeholder='Recipient name'
                                {...register("recipient_name", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.recipient_name && <span className="text-orange-600">This field is required</span>}
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
                                {/* {
                                    blooGroup.map((group, i) => <option key={i} value={group}>{group}</option>)
                                } */}
                            </select>
                            {/* {validationError && <p className="text-orange-600">{validationError}</p>} */}
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
                                // onChange={(e) => handleSelectDistrict(e)}
                                defaultValue={'choose_district'}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                                <option disabled value={'choose_district'}>Choose your district</option>
                                {
                                    districts.map(district => <option key={district?.id} value={district?.name}>{district?.name}</option>)
                                }
                            </select>
                            {/* {validationError && <p className="text-orange-600">{validationError}</p>} */}
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
                                {/* {
                                    selectedUpazilas?.map((upazila, i) => <option key={i} value={upazila?.name}>{upazila?.name}</option>)
                                } */}
                            </select>
                            {/* {validationError && <p className="text-orange-600">{validationError}</p>} */}
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
            </div>
        </div>
    );
};

export default CreateDonationRequest;