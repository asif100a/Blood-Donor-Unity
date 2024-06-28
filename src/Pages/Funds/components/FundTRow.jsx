import PropTypes from 'prop-types';

const FundTRow = ({ data, i }) => {
    console.log(data);
    const { name, email, donation_amount, date } = data;

    // Get the readable date
    const donation_date = new Date(date).toLocaleDateString('en-GB');

    return (
        <>
            <tr>
                <th>{i + 1}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{donation_amount}</td>
                <td>{donation_date}</td>
            </tr>
        </>
    );
};

FundTRow.propTypes = {
    data: PropTypes.func,
    i: PropTypes.number
};

export default FundTRow;