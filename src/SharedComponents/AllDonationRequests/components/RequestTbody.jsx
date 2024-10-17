import PropTypes from 'prop-types';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';

const RequestTbody = ({ data, index, handleDelete, volunteer, admin, handleChangeStatus }) => {
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
        // At first split the time into hour & munite and convert in number
        const [hour24, munite] = time24.split(':').map(Number);

        // Check the hour whether is it greater than 12 or less than 12
        // Get am & pm period
        const period = hour24 >= 12 ? 'PM' : 'AM';

        // Convert 24 hour into 12 hour
        const hour12 = hour24 % 12 || 12;

        // Ensures munite are two digit and 0 will be added for before 1 character value
        const paddedMunite = munite.toString().padStart(2, '0');

        // Format the hour, time and period
        const time12 = `${hour12}:${paddedMunite} ${period}`;

        // Finally return the 12 hour time
        return time12;
    };
    const donation_time = convertInto12Hour(time);

    // Get selected value from the field
    const handleChange = (e) => {
        const value = e.target.value;
        handleChangeStatus(value, _id)
    };

    return (
        <>
            <tr className='dark:text-gray-100'>
                <th>{index + 1}</th>
                <td>{recipient_name}</td>
                <td>{upazila}, {district}</td>
                <td>{donation_date}</td>
                <td>{donation_time}</td>
                <td>
                    <div className='flex gap-2 items-center'>
                        <p className={`${donation_status === 'pending' && 'bg-yellow-400'} ${donation_status === 'in progress' && 'bg-blue-400'}  ${donation_status === 'complete' && 'bg-green-500'} w-2 h-2`}></p>
                        <p>{donation_status}</p>
                    </div>
                </td>
                <td>
                    {
                        data?.donor ? <div>
                            <p>{data?.donor?.name}</p>
                            <p className='text-sm'>{data?.donor?.email}</p>
                        </div> :
                            ''
                    }
                </td>
                {
                    (volunteer || admin) && <td>
                        <select
                            name='status'
                            onChange={handleChange}
                            defaultValue={'change_status'}
                            className="select select-info w-fit h-8 min-h-8"
                        >
                            <option disabled value={'change_status'}>Change status</option>
                            <option>pending</option>
                            <option>in progress</option>
                            <option>complete</option>
                        </select>
                    </td>
                }
                <td>
                    <Link to={volunteer ? '' : `/dashboard/edit_donor_request/${_id}`}><button className={`${volunteer && 'cursor-not-allowed'}btn bg-white dark:bg-inherit border-none shadow-none hover:bg-white hover:dark:bg-inherit`}><FaRegEdit className={`h-5 w-5 hover:transform hover:scale-125 text-green-600 ${volunteer && 'opacity-60 cursor-not-allowed'}`} /></button></Link>
                </td>
                <td>
                    <button
                        onClick={volunteer ? null : () => handleDelete(_id)}
                        className={`${volunteer && 'cursor-not-allowed opacity-60'} btn bg-white dark:bg-inherit border-none shadow-none hover:bg-white hover:dark:bg-inherit`}><MdDeleteForever className='h-6 w-6 hover:transform hover:scale-125 text-red-600' /></button>
                </td>
            </tr>
        </>
    );
};

RequestTbody.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    handleDelete: PropTypes.func,
    volunteer: PropTypes.bool,
    admin: PropTypes.bool,
    handleChangeStatus: PropTypes.func
};

export default RequestTbody;