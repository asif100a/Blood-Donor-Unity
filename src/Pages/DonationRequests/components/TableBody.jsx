import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TableBody = ({i, request}) => {
    console.log(request);
    const {_id, recipient_name, district, upazila, selectedDate, time} = request;

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
                    <Link to={`/donation_request_details/${_id}`}><button className={`btn bg-white hover:bg-white border-orange-600 text-green-600 font-semibold`}>View details</button></Link>
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