import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TableBody = ({ i, request }) => {
    console.log(request);
    const { _id, recipient_name, district, upazila, selectedDate, time } = request;

    // Convert selectedData to readable date
    const request_date = new Date(selectedDate).toLocaleDateString('en-GB');

    // Convert time to readable time
    const getReadableTime = (time24) => {
        // Separate hour and munite
        const [hour24, munite] = time24.split(':').map(Number);

        // Get the period of time
        const period = hour24 >= 12 ? 'PM' : 'AM';

        // Convert 24 hour to 12 hour
        const hour12 = hour24 % 12 || 12;

        // Formate the munite
        const formatedMunite = munite.toString().padStart(2, '0');

        // Get the formated 12 hour time
        const time12 = `${hour12}:${formatedMunite} ${period}`;

        return time12;
    };

    const request_time = getReadableTime(time);

    return (
        <>
            <tr>
                <th>{i + 1}</th>
                <td>{recipient_name}</td>
                <td>{upazila}, {district}</td>
                <td>{request_date}</td>
                <td>{request_time}</td>
                <td>
                    <Link to={`/donation_request_details/${_id}`}>
                        <button className="relative inline-flex items-center justify-start py-2 pl-4 pr-12 overflow-hidden font-semibold text-green-600 transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6 bg-gray-50 bg-opacity-90 group rounded-full border border-green-500">
                            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-green-500 group-hover:h-full"></span>
                            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white flex gap-1"><span>View</span> <span>Details</span></span>
                        </button>
                    </Link>
                </td>
            </tr>
        </>
    );
};

TableBody.propTypes = {
    i: PropTypes.number,
    request: PropTypes.object
};

export default TableBody;