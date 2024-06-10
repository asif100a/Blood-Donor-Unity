import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import SearchTRow from "./components/SearchTRow";
import LoadingSpiner from "../../SharedComponents/LoadingSpiner/LoadingSpiner";

const SearchPage = () => {
    const axiosPublic = useAxiosPublic();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazilas, setSelectedUpazilas] = useState([]);
    const bloodGroup = [' A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const [bloodFieldError, setBloodFieldError] = useState('');
    const [districtFieldError, setDistrictFieldError] = useState('');
    const [upazilaFieldError, setUpazilaFieldError] = useState('');
    // const { user } = useAuth();
    // const navigate = useNavigate();
    const [searchedData, setSearchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [notFound, setNotFound] = useState('')

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

    // Select the specific district to show it's upazilas
    const handleSelectDistrict = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const {
        register,
        handleSubmit,
        // reset
    } = useForm();


    const onSubmit = async (data) => {
        setIsLoading(true);
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
        const params = new URLSearchParams(data).toString();
        console.log(params)
        try {
            const { data: search_value } = await axiosPublic(`/search-value?${params}`);
            console.log(search_value);
            setSearchedData(search_value);
            setIsLoading(false);
            console.log(search_value.length)
            if (search_value.length === 0) {
                setNotFound('🚫No data found with your search');
            } else {
                setNotFound('');
            }

        } catch (err) {
            console.error(err);

        }
    };

    useEffect(() => {
        if (searchedData?.length === 0) {
            setNotFound('🔍Search from blood donation requests');
        }
    }, [searchedData?.length]);


    if (isLoading) {
        return <LoadingSpiner />
    }


    return (
        <>
            <section className="w-fit p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white text-center">Search donation request</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                    <div className="flex gap-3">
                        <div className="">
                            <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                Select blood group
                            </label>
                            <div className="mt-2">
                                <select
                                    name='blood_group'
                                    {...register("blood_group", { required: true })}
                                    defaultValue={'choose_blood'}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                                    <option disabled value={'choose_blood'}>Choose a blood group</option>
                                    {
                                        bloodGroup.map((group, i) => <option key={i} value={group}>{group}</option>)
                                    }
                                </select>
                                {bloodFieldError && <p className="text-orange-600">{bloodFieldError}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">
                                Select district
                            </label>
                            <div className="mt-2">
                                <select
                                    name='district'
                                    {...register("district", { required: true })}
                                    onChange={(e) => handleSelectDistrict(e)}
                                    defaultValue={'choose_district'}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                                    <option disabled value={'choose_district'}>Choose a district</option>
                                    {
                                        districts.map(district => <option key={district?.id} value={district?.name}>{district?.name}</option>)
                                    }
                                </select>
                                {districtFieldError && <p className="text-orange-600">{districtFieldError}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="upazila" className="block text-sm font-medium leading-6 text-gray-900">
                                Select upazila
                            </label>
                            <div className="mt-2">
                                <select
                                    name='upazila'
                                    {...register("upazila", { required: true })}
                                    defaultValue={'choose_upazila'}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                                    <option disabled value={'choose_upazila'}>Choose a upazila</option>
                                    {
                                        selectedUpazilas?.map((upazila, i) => <option key={i} value={upazila?.name}>{upazila?.name}</option>)
                                    }
                                </select>
                                {upazilaFieldError && <p className="text-orange-600">{upazilaFieldError}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Button Text</span>
                        </button>
                    </div>
                </form>

            </section>


            {
                searchedData.length > 0 && (
                    <>
                    <div>
                        <h3 className="my-6 text-2xl font-medium text-center">Found data: {searchedData?.length}</h3>
                    </div>
                        <div className="overflow-x-auto mt-8">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Recipient name</th>
                                        <th>Recipient location</th>
                                        <th>Donation date</th>
                                        <th>Donation time</th>
                                        <th>See details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        searchedData?.map((item, i) => <SearchTRow key={item?._id} i={i} item={item} />)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            }
            {
                notFound && (
                    <h2 className="text-2xl font-semibold text-center my-12">{notFound}</h2>
                )
            }
        </>
    );
};

export default SearchPage;