import PropTypes from 'prop-types';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';

const RequestTRow = ({ data, index, handleDelete }) => {
    console.log(data);
    const {
        _id,
        recipient_name, 
        district, 
        upazila, 
        selectedDate,
        time,
        donation_status 
    } = data;

    // Get the readable date 
    const donation_date = new Date(selectedDate).toLocaleDateString('en-GB');

    // Convert 24 hour to 12 hour
    const convertInto12Hour = (time24) => {
        // At first split the time into hour & minute and convert in number
        const [hour24, minute] = time24.split(':').map(Number);

        // Check the hour whether is it greater than 12 or less than 12
        // Get am & pm period
        const period = hour24 >= 12 ? 'PM' : 'AM';

        // Convert 24 hour into 12 hour
        const hour12 = hour24 % 12 || 12;

        // Ensures minute are two digit and 0 will be added for before 1 character value
        const paddedMinute = minute.toString().padStart(2, '0');

        // Format the hour, time and period
        const time12 = `${hour12}:${paddedMinute} ${period}`;

        // Finally return the 12 hour time
        return time12;
    };

    const donation_time = convertInto12Hour(time);
    
    return (
        <>
            <tr className='dark:text-gray-100'>
                <th>{index + 1}</th>
                <td>{recipient_name}</td>
                <td>{upazila}, {district}</td>
                <td>{donation_date}</td>
                <td>{donation_time}</td>
                <td>{donation_status}</td>
                <td>{}</td>
                <td>
                    <Link to={`/dashboard/edit_donor_request/${_id}`}><button className='btn bg-white dark:bg-inherit border-none shadow-none hover:bg-white hover:dark:bg-inherit'><FaRegEdit className='h-5 w-5 hover:transform hover:scale-125 text-green-600' /></button></Link>
                </td>
                <td>
                    <button 
                    onClick={() => handleDelete(_id)}
                    className="btn bg-white dark:bg-inherit border-none shadow-none hover:bg-white hover:dark:bg-inherit"><MdDeleteForever className='h-6 w-6 hover:transform hover:scale-125 text-red-600' /></button>
                </td>
            </tr>
        </>
    );
};

RequestTRow.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    handleDelete: PropTypes.func
};

export default RequestTRow;