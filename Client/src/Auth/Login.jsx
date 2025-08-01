import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const backendUrl = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/auth/google`;
  };

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    try {
      const url = `${backendUrl}/login`;
      const response = await axios.post(url, data);
      console.log(response.data);
      reset();
      const token = response.data.token;
      const activationToken = response.data.activationToken;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("activationToken", activationToken);
      }
      navigate("/");
    } catch (error) {
      console.error(`Login failed:`, error.response?.data || error.message);
      alert(error.response?.data?.error || "An error occurred");
    }
  };
  return (
    <div className="space-y-8 ">
      <div className="text-center ">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Sign in to your account
        </p>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center  gap-2 border border-gray-400 rounded-xl text-black dark:text-white font-semibold p-2 text-lg w-full"
      >
        <img src="/GoogleIcon.svg" alt="Google sign-in" className="size-6" />

        <p>Continue with google</p>
      </button>

      {/* or  */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="mx-4 text-gray-500 font-medium text-sm">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Email
          </label>
          <div className="mt-3">
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className="block w-full rounded-xl border border-gray-400 px-3 py-2 text-gray-900 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm bg-transparent"
            />
            {errors.Email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Password
          </label>
          <div className="mt-3 relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="block w-full rounded-xl bg-transparent border border-gray-400 px-3 py-2 text-gray-900 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
            </button>
            {errors.Password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Password.message}
              </p>
            )}
          </div>
          <div className="text-right mt-2 mb-4">
            <a
              href="#"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-md py-2 px-4 text-white font-semibold ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
