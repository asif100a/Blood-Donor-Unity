import PropTypes from 'prop-types';

const UsersTRow = ({
    user,
    handleBlockUser,
    handleUnblockUser,
    handleMakeDonor,
    handleMakeVolunteer,
    handleMakeAdmin
}) => {
    console.log(user);
    const { _id, name, email, image, role, status } = user;
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
                        defaultValue={'change_status'}
                        className="select select-info w-fit h-8 min-h-8"
                    >
                        <option disabled value="change_status">Change status</option>
                        <option onClick={handleBlockUser} value="block">Block</option>
                        <option onClick={handleUnblockUser} value="unblock">Unblock</option>
                    </select>
                </td>
                <td>
                    <select
                        name="activity"
                        id="activity"
                        defaultValue={'change_role'}
                        className="select select-secondary w-fit h-8 min-h-8"
                    >
                        <option disabled value="change_role">Change role</option>
                        <option onClick={handleMakeDonor} value="donor">Donor</option>
                        <option onClick={handleMakeVolunteer} value="volunteer">Volunteer</option>
                        <option onClick={handleMakeAdmin} value="admin">Admin</option>
                    </select>
                </td>
            </tr>
        </>
    );
};

UsersTRow.propTypes = {
    user: PropTypes.object,
    handleBlockUser: PropTypes.func,
    handleUnblockUser: PropTypes.func,
    handleMakeDonor: PropTypes.func,
    handleMakeVolunteer: PropTypes.func,
    handleMakeAdmin: PropTypes.func,
};

export default UsersTRow;