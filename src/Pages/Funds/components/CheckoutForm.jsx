import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const CheckoutForm = ({ amount, setIsOpen, refetch }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const sendAmount = async () => {
            const { data } = await axiosSecure.post('/create-fund-intent', { value: amount });
            console.log(data.clientSecret);
            setClientSecret(data?.clientSecret);
        };
        sendAmount();
    }, [amount, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.error(error);
            return setError(error?.message);

        } else {
            console.log('payment Method:', paymentMethod);
            setError('');
        }

        // Confirm donation
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }
            }
        });
        if (confirmError) {
            console.error('confirm error:', confirmError);

        } else {
            console.log('paymentIntent:', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                toast.success("Your donation successfully received");

                const fund = {
                    name: user?.displayName,
                    email: user?.email,
                    donation_amount: amount,
                    date: new Date()
                };

                // Save the donation to the database
                const { data } = await axiosSecure.post('/donation-fund', { fund });
                console.log(data);
                if (data?.insertedId) {
                    setIsOpen(false);
                    refetch();
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="text-start mt-6">
                <div className="flex justify-between">
                    <button type="submit" disabled={!stripe || !clientSecret} className={`t-6 relative rounded-full px-3 py-2 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 ${!stripe || !clientSecret && 'opacity-50'}`}>
                        <span className="absolute right-0 w-6 h-24 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative">Confirm donation</span>
                    </button>

                    <button onClick={handleCloseModal} type="button" className={`t-6 relative rounded-full px-3 py-2 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300`}>
                        <span className="absolute right-0 w-6 h-24 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative">Exit donation</span>
                    </button>
                </div>
                {error && <p className="text-orange-600">{error}</p>}
            </div>
        </form>
    );
};

CheckoutForm.propTypes = {
    amount: PropTypes.string,
    setIsOpen: PropTypes.func,
    refetch: PropTypes.func,
};

export default CheckoutForm;