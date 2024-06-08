import PropTypes from 'prop-types';

const TableBody = ({i, request}) => {
    console.log(request);
    const {_id, recipient_name, district, upazila, selectedDate, time} = request;

    // Convert selectedData to readable date
    const request_date = new Date(selectedDate).toLocaleDateString('en-GB');

    // Convert time to readable time
    const readableTime = (time) => {
        // Separate hour and munite
        const [hour24, munite] = time.split(':').map(Number);

        // Get the period of time
        const period = hour24 >= 12 ? 'PM' : 'AM';

        // Convert 24 hour to 12 hour
        const hour12 = hour24 % 12 || 12;

        // Formate the munite
        
    };

    return (
        <>
            <tr>
                <th>{i + 1}</th>
                <td>{recipient_name}</td>
                <td>{upazila}, {district}</td>
                <td>{request_date}</td>
                <td>{}</td>
                <td>
                    <button
                        className={`btn`}>View details</button>
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