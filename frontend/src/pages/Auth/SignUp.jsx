import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout"
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useContext, useState } from "react";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector"
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

export default function SignUp() {

    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {updateUser} = useContext(UserContext);

    const navigate = useNavigate();

    //handle signup of form 
    const handleSingUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if(!fullName){
            setError("Please enter your name");
            return;
        }

        if(!validateEmail(email)){

            setError("Please enter a valid email address.");
            return;
        }

        if(!password){
            setError("Please enter the password");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setError('');

        //Sign up API call
        try {
            
            //upload image
            if(profilePic){
                const imageUploadRes = await uploadImage(profilePic);
                console.log(imageUploadRes)
                profileImageUrl = imageUploadRes.imageUrl || "";

            }
            
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER , {
                fullName,
                email,
                password,
                profileImageUrl
            });

            const {token , user} = response.data;

            if(token){
                localStorage.setItem("token" , token);
                updateUser(user);
                navigate('/dashboard');
            }
        } catch (error) {
            
            if(error.response && error.response.data.message){
                setError(error.response.data.message);
            } else{
                setError("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">

                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSingUp}>

                    <ProfilePhotoSelector
                        image={profilePic}
                        setImage={setProfilePic}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <Input
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            label={'Full Name'}
                            placeholder='Jhon'
                            type='text'
                        />
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="john@example.com"
                            type="text"
                            label='Email Address'
                        />
                        <div className="col-span-2">
                            <Input
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Min 8 Characters"
                                type="password"
                                label='Password'
                            />
                        </div>



                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        SIGN UP
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link to='/login' className="font-medium text-Primary underline" >LogIn</Link>
                    </p>

                </form>

            </div>
        </AuthLayout>
    )
}