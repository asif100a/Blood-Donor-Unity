import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Blood.png';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const { loginUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    const to = location?.state?.from;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.table(data);

        // Login the user
        try {
            const result = await loginUser(data?.email, data?.password);
            console.log(result?.user);
            toast.success('You have successfully logged in');
            navigate(to ? to : '/')

        } catch (err) {
            console.error(err.message);
            if (err?.message === 'Firebase: Error (auth/invalid-credential).') {
                return toast.error('Invalid email or password')
            }
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center items-center gap-2">
                    <img src={logo} alt="" className="w-[72px] h-[80px]" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-medium leading-9 tracking-tight text-gray-900">
                    Login your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder='Your email'
                                {...register("email", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder='Your password'
                                {...register("password", { required: true })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500 space-x-2">
                    <span>New in our {'"Blood Donator Unity"'}?</span>
                    <Link to={'/register'} className="font-medium leading-6 text-indigo-600 hover:text-indigo-500 hover:underline">
                        Register now.
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;