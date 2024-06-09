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
import { useNavigate } from "react-router-dom";

const CreateDonationRequest = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazilas, setSelectedUpazilas] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState('10:00');
    const blooGroup = [' A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const [validationError, setValidationError] = useState('');
    const [bloodFieldError, setBloodFieldError] = useState('');
    const [districtFieldError, setDistrictFieldError] = useState('');
    const [upazilaFieldError, setUpazilaFieldError] = useState('');

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const navigate = useNavigate();

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
        reset
    } = useForm();


    const onSubmit = async (data) => {
        // Reset the validation error
        setValidationError('');
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
        console.table({ selectedDate, time });
        const donation_status = 'pending'
        // const 

        // Save donation request data to the database
        try {
            const {data: donationRequestData} = await axiosSecure.post('/donation-requests', {...data, selectedDate, time, donation_status});
            console.log(donationRequestData);
            reset();
            setSelectedDate(new Date());
            setTime('10:00')
            toast.success('Donation request created successfully');
            navigate('/dashboard/my_donation_requests')

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div>
                <h1 className="text-4xl font-semibold text-center">Create a donation request</h1>
            </div>
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
                                value={user?.displayName}
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
                                value={user?.email}
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
                                type="name"
                                placeholder='Recipient name'
                                {...register("recipient_name", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.recipient_name && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                            Recipient blood group
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
                            {bloodFieldError && <p className="text-orange-600">{bloodFieldError}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">
                            {"Recipient's"} district
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
                            {districtFieldError && <p className="text-orange-600">{districtFieldError}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="upazila" className="block text-sm font-medium leading-6 text-gray-900">
                        {"Recipient's"} upazila
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
                            {upazilaFieldError && <p className="text-orange-600">{upazilaFieldError}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="hospital_name" className="block text-sm font-medium leading-6 text-gray-900">
                                Hospital name
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="hospital_name"
                                name="hospital_name"
                                type="text"
                                placeholder='Hospital name'
                                {...register("hospital_name", { required: true, })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.hospital_name && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="full_address" className="block text-sm font-medium leading-6 text-gray-900">
                                Full address
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="full_address"
                                name="full_address"
                                type="text"
                                placeholder='Full address'
                                {...register("full_address", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.full_address && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="donation_date" className="block text-sm font-medium leading-6 text-gray-900">
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
                                className="block w-[24rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" />
                            {errors.donation_date && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="donation_time" className="block text-sm font-medium leading-6 text-gray-900">
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
                                className="block w-[24rem] rounded-md border-0" />
                            {errors.donation_date && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="request_message" className="block text-sm font-medium leading-6 text-gray-900">
                                Request message
                            </label>
                        </div>
                        <div className="mt-2">
                            <textarea
                                id="request_message"
                                name="request_message"
                                type="password"
                                placeholder='Request message'
                                {...register("request_message", { required: true })}
                                className="textarea textarea-primary block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            ></textarea>
                            {errors.request_message && <span className="text-orange-600">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <input
                            type="submit"
                            value={'Create donation request'}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationRequest;