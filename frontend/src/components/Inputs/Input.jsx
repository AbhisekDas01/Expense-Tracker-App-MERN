import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

export default function Input({ value, onChange, label, placeholder, type }) {

    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    }
    return (
        <div>
            <label className="text-[13px] text-slate-800">{label}</label>

            <div className="input-box">

                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e)}
                    value={value}
                    className="w-full bg-transparent outline-none"
                />

                {
                    type === 'password' && (
                        <>
                            {
                                showPassword ? (
                                    <FaRegEye
                                        size={22}
                                        className="text-Primary cursor-pointer"
                                        onClick={() => toggleShowPassword()}
                                    />
                                ) : (
                                    <FaRegEyeSlash
                                        size={22}
                                        className="text-slate-400 cursor-pointer"
                                        onClick={() => toggleShowPassword()}
                                    />
                                )
                            }
                        </>
                    )
                }

            </div>
        </div>
    )
}