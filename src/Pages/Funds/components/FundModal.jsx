import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Fragment } from "react";
import CheckoutForm from "./CheckoutForm";
import PropTypes from "prop-types";

const FundModal = ({ isOpen, closeModal, amount, handleGetAmount, setIsOpen, refetch }) => {
    const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                                    Your donation will help others
                                </DialogTitle>
                                <form className='mt-6 text-center'>
                                    <label htmlFor="amount" className="font-semibold mr-6 dark:text-gray-800">Amount:</label>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={handleGetAmount}
                                        placeholder="Amount"
                                        className="input input-bordered dark:bg-white w-40"
                                    />
                                </form>
                                <hr className='mt-8 ' />

                                <Elements stripe={stripePromise}>
                                    {/* checkout form */}
                                    <CheckoutForm
                                        amount={amount}
                                        setIsOpen={setIsOpen}
                                        refetch={refetch}
                                    />
                                </Elements>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

FundModal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    amount: PropTypes.string,
    handleGetAmount: PropTypes.func,
    setIsOpen: PropTypes.func,
    refetch: PropTypes.func
};

export default FundModal;