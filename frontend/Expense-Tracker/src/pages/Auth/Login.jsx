import { use, useContext, useState } from "react"
import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout"
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();



    //hadle login function 
    const handleLogin = async (event) => {
        event.preventDefault(); //to prevent the page refresh

        //check for email validity
        if (!validateEmail(email)) {

            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        

        setError('');

        //login API call
        try {

            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user)
                navigate('/dashboard');
            }

        } catch (error) {

            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong , Please try again !");
            }
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="john@example.com"
                        type="text"
                        label='Email Address'
                    />
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Min 8 Characters"
                        type="password"
                        label='Password'
                    />

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        LOGIN
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?{" "}
                        <Link to='/signup' className="font-medium text-Primary underline" >SignUp</Link>
                    </p>

                </form>


            </div>
        </AuthLayout>
    )
}