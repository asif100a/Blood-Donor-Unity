import PropTypes from 'prop-types';

const UsersTRow = ({
    user,
    handleSelectedActivity,
    handleSelectedRole,
    isDisable
}) => {
    const { _id, name, email, image, role, status } = user;
    console.log(isDisable)

    // Handle the changes of activitey selection
    const handleActivity = (e) => {
        handleSelectedActivity(e.target.value, email);
    };

    // Handle the role of user
    const handleRole = (e) => {
        handleSelectedRole(e.target.value, email);
    }

    return (
        <>
            <tr>
                <th>
                    <p></p>
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={image} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <p>{name}</p>
                </td>
                <td>
                    <p>{email}</p>
                </td>
                <td>
                    <p>{role}</p>
                </td>
                <td>
                    <div className='flex gap-2 items-center justify-center'>
                        <p className='w-2 h-2 bg-green-500'></p>
                        <p>{status}</p>
                    </div>
                </td>
                <td>
                    <select
                        name="activity"
                        id="activity"
                        disabled={isDisable === email ? true : false}
                        onChange={handleActivity}
                        defaultValue={'change_status'}
                        className="select select-info w-fit h-8 min-h-8"
                    >
                        <option disabled value="change_status">Change status</option>
                        <option value="block">Block</option>
                        <option value="unblock">Unblock</option>
                    </select>
                </td>
                <td>
                    <select
                        name="activity"
                        id="activity"
                        disabled={isDisable === email ? true : false}
                        onChange={handleRole}
                        defaultValue={'change_role'}
                        className="select select-secondary w-fit h-8 min-h-8"
                    >
                        <option disabled value="change_role">Change role</option>
                        <option value="donor">Donor</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="admin">Admin</option>
                    </select>
                </td>
            </tr>
        </>
    );
};

UsersTRow.propTypes = {
    user: PropTypes.object,
    handleSelectedActivity: PropTypes.func,
    handleSelectedRole: PropTypes.func,
    isDisable: PropTypes.string
};

export default UsersTRow;