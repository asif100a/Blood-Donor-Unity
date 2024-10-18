import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";

const EditDonorRequest = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const bloodGroup = [' A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const [bloodFieldError, setBloodFieldError] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazilas, setSelectedUpazilas] = useState([]);
    const [validationError, setValidationError] = useState('');

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    // Get the field data from the database
    const requestData = useLoaderData();
    // console.log(requestData);
    const {
        _id,
        requester_name,
        requester_email,
        recipient_name,
        blood_group,
        district,
        upazila,
        hospital_name,
        full_address,
        request_message,
        selectedDate: previous_date,
        time: previous_time,
    } = requestData;
    // console.log(blood_group)

    const [selectedDate, setSelectedDate] = useState(previous_date);
    const [time, setTime] = useState(previous_time);

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
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        // Reset the validation error
        setValidationError('');

        if (data?.blood_group === 'choose_blood') {
            return setBloodFieldError('Please choose 1 category');
        }
        else if (data?.district === 'choose_district') {
            return setValidationError('Please choose 1 category');
        }
        else if (data?.upazila === 'choose_upazila') {
            return setValidationError('Please choose 1 category');
        }

        console.table(data);
        console.table({ selectedDate, time });
        const donation_status = 'pending'
        // const 

        // Save donation request data to the database
        try {
            const { data: donationRequestData } = await axiosSecure.patch(`/donation-requests/${_id}`, { ...data, selectedDate, time, donation_status });
            console.log(donationRequestData);
            if (donationRequestData?.modifiedCount > 0) {
                toast.success('Donation request updated successfully');
                navigate('/dashboard/my_donation_requests')
            }

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="my-6 contain-width mx-auto overflow-hidden border-red-500">
            <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl dark:text-gray-100 font-semibold text-center w-[200px] sm:w-auto mx-auto capitalize">Edit donation request</h1>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[880px] border-2 border-dashed border-orange-600 sm:p-6 p-3 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6" action="#" method="POST">
                    <div>
                        <label htmlFor="requester_name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Rrequester name
                        </label>
                        <div className="mt-2">
                            <input
                                id="requester_name"
                                name="requester_name"
                                type="text"
                                value={requester_name}
                                placeholder='Requester name'
                                {...register("requester_name", { required: true })}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.requester_name && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="requester_email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Requester email
                        </label>
                        <div className="mt-2">
                            <input
                                id="requester_email"
                                name="requester_email"
                                type="email"
                                value={requester_email}
                                placeholder='Requester email'
                                {...register("requester_email", { required: true })}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.requester_email && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="recipient_name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Recipient name
                        </label>
                        <div className="mt-2">
                            <input
                                id="recipient_name"
                                name="recipient_name"
                                type="name"
                                defaultValue={recipient_name}
                                {...register("recipient_name", { required: true })}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.recipient_name && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            Recipient blood group
                        </label>
                        <div className="mt-2">
                            <select
                                name='blood_group'
                                {...register("blood_group", { required: true })}
                                defaultValue={blood_group}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            >
                                <option disabled value={'choose_blood'}>Choose your blood group</option>
                                {
                                    bloodGroup.map((group, i) => <option key={i} value={group}>{group}</option>)
                                }
                            </select>
                            {bloodFieldError && <p className="text-orange-600">{bloodFieldError}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            {"Recipient's"} district
                        </label>
                        <div className="mt-2">
                            <select
                                name='district'
                                {...register("district", { required: true })}
                                onChange={(e) => handleSelectDistrict(e)}
                                defaultValue={district}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4">
                                <option disabled value={'choose_district'}>Choose your district</option>
                                <option value={district}>{district}</option>
                                {
                                    districts.map(district => <option key={district?.id} value={district?.name}>{district?.name}</option>)
                                }
                            </select>
                            {validationError && <p className="text-orange-600">{validationError}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="upazila" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                            {"Recipient's"} upazila
                        </label>
                        <div className="mt-2">
                            <select
                                name='upazila'
                                {...register("upazila", { required: true })}
                                defaultValue={upazila}
                                // value={upazila}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4">
                                <option disabled value={'choose_upazila'}>Choose your upazila</option>
                                {selectedUpazilas?.length > 0 || <option value={upazila}>{upazila}</option>}
                                {
                                    selectedUpazilas?.map((upazila, i) => <option key={i} value={upazila?.name}>{upazila?.name}</option>)
                                }
                            </select>
                            {validationError && <p className="text-orange-600">{validationError}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="hospital_name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                                Hospital name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="hospital_name"
                                name="hospital_name"
                                type="text"
                                defaultValue={hospital_name}
                                {...register("hospital_name", { required: true, })}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.hospital_name && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="full_address" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                                Full address
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="full_address"
                                name="full_address"
                                type="text"
                                defaultValue={full_address}
                                {...register("full_address", { required: true })}
                                className="block w-full rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.full_address && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="donation_date" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                                Donation date
                            </label>
                        </div>
                        <div className="mt-2">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                minDate={new Date()}
                                dateFormat={'dd/MM/yyyy'}
                                showYearDropdown
                                scrollableMonthYearDropdown
                                className="block date-width rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.donation_date && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="donation_time" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                                Donation time
                            </label>
                        </div>
                        <div className="mt-2">
                            <TimePicker
                                onChange={setTime}
                                value={time}
                                disableClock={true}
                                format="hh:mm a"
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                                className="block date-width rounded-full border py-2 text-gray-900 dark:text-gray-100 shadow-sm border-green-500 dark:bg-black placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.donation_date && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="request_message" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 pl-3">
                                Request message
                            </label>
                        </div>
                        <div className="mt-2">
                            <textarea
                                id="request_message"
                                name="request_message"
                                type="password"
                                defaultValue={request_message}
                                {...register("request_message", { required: true })}
                                className="block w-full h-32 py-2.5 rounded-xl border text-gray-900 dark:text-gray-100 shadow-sm border-green-500 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:outline-none focus:ring-opacity-40 focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            ></textarea>
                            {errors.request_message && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div className='col-span-1 sm:col-span-2 text-center mt-6'>
                        <button type='submit' className="relative rounded-full w-full sm:w-[402px] px-5 py-2 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Edit donation request</span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditDonorRequest;