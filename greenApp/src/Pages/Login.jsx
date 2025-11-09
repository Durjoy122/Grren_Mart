import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, resetPassword , signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                toast.success("User logged in successfully!");
                setError(""); 
                navigate(location.state?.from || "/");
                form.reset(); 
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleForgotPassword = () => {
        const email = prompt("Please enter your email for password reset:");
        if (!email) return;

        resetPassword(email)
            .then(() => toast.success("Password reset email sent!"))
            .catch((err) => toast.error(err.message));
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
        .then(() => {
            toast.success("Logged in with Google!");
            navigate(location.state?.from || "/");
        })
        .catch(error => toast.error(error.message));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                            required
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className="text-right">
                        <button type="button" onClick={handleForgotPassword} className="text-sm text-green-300 hover:underline">Forgot Password?</button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                    >
                        Login
                    </button>

                    {error && <p className='text-red-400 text-xs mt-1'>{error}</p>}
                </form>

                <div className="flex items-center my-5">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-400 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>

                <p className="text-sm text-center text-green-600 mt-4">
                    Don't have an account? <Link to="/auth/registration" className="text-green-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;