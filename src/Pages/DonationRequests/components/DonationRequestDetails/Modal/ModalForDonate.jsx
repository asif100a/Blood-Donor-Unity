import PropTypes from 'prop-types';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import useAuth from '../../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ModalForDonate = ({ isOpen, onClose, id }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Change the status of donation status
    // Get value from the field and save it in the database
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        console.table({ name, email, id });
        const donor = { name, email }
        const donation_status = 'in progress';

        // Save data to the database
        const { data } = await axiosSecure.put(`/pending-requests/${id}`, {donor, donation_status});
        console.log(data);
        if (data?.modifiedCount > 0) {
            toast.success('Your donation received successfully');
            onClose();
            navigate('/donation_requests');
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Donate blood to help others
                                </DialogTitle>
                                <form onSubmit={handleSubmit} className='space-y-3 pt-3'>
                                    <div>
                                        <label className="text-gray-700" htmlFor="username">Your name:</label>
                                        <input
                                            id="name"
                                            type="text"
                                            name='name'
                                            readOnly
                                            value={user?.displayName}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-gray-700" htmlFor="username">Your email address:</label>
                                        <input
                                            id="email"
                                            type="email"
                                            name='email'
                                            readOnly
                                            value={user?.email}
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                                        />
                                    </div>
                                    <div className='flex justify-between pt-2'>
                                        <input type="submit" value={'Confirm donation'} className='btn bg-green-600 text-white hover:bg-green-700' />
                                        <button type='button' onClick={onClose} className="btn bg-orange-600 text-white hover:bg-orange-700">Close</button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

ModalForDonate.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    id: PropTypes.string
};

export default ModalForDonate;