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
                <h2 className="mt-6 text-center text-3xl font-medium leading-9 tracking-tight text-gray-900 capitalize">
                    Login your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[420px] sm:p-6 p-3 border-2 border-dashed border-orange-500 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 pl-3">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder='Your email'
                                {...register("email", { required: true })}
                                className="block w-full rounded-full border py-2 text-gray-900 shadow-sm border-green-400 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-400 focus:outline-none focus:ring-2 focus:ring-opacity-40 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 pl-3">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-green-600 hover:text-green-500 pr-3">
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
                                className="block w-full rounded-full border py-2 text-gray-900 shadow-sm border-green-400 placeholder:text-gray-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-40 focus:outline-none focus:border-green-500 sm:text-sm sm:leading-6 px-4"
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    <div>
                        <button type='submit' className="relative rounded-full w-full px-5 py-2 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300">
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Login now</span>
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500 space-x-2">
                    <span>New in our {'"Blood Donator Unity"'}?</span>
                    <Link to={'/register'} className="font-medium leading-6 text-green-600 hover:text-green-500 hover:underline">
                        Register now.
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;