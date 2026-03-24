import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ForgetPassword = () => {
  const primaryColor = "bg-blue-500";
  const borderColor = "#ddd";

  const [email, setEmail] = useState("");
  const [step, setstep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

 const handleSendOtp = async () => {
    try {
       setIsLoading(true)
      const res = await axios.post(
       "http://localhost:3100/api/user/forgot-password",
        { email },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setErr("")
        setstep(2);
      } else {
        setErr(res.data.message)
        toast.error(res.data.message);
      }
    } catch (error) {
       setErr(error.response?.data?.message || "Something went wrong")
      toast.error(error.response?.data?.message || "Something went wrong"); //the error which u recive from backend
    }finally{
      setIsLoading(false)
    }
  };

  const verifiyotp = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(
        "http://localhost:3100/api/user/verify-otp",
        { email,otp },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setErr("")
        setstep(3);
      } else {
        setErr(res.data.message)
        toast.error(res.data.message);
      }
    } catch (error) {
       setErr(error.response?.data?.message || "Something went wrong")
      toast.error(error.response?.data?.message || "Something went wrong"); //the error which u recive from backend
    }finally{
      setIsLoading(false)
    }
  };

  const changePassword = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(
        "http://localhost:3100/api/user/change-password",
        {newpassword,confirmpassword,email },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setErr("")
        navigate("/login")
      } else {
        setErr|(res.data.message)
        toast.error(res.data.message);
      }
    } catch (error) {
       setErr(error.response?.data?.message || "Something went wrong")
      toast.error(error.response?.data?.message || "Something went wrong"); //the error which u recive from backend
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="bg-gray-100 w-full min-h-screen flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-2">
          <Link to="/register">
            <ArrowLeft size={30} className="text-blue-500" />
          </Link>
          <h1
            className="text-3xl font-bold text-center"
            style={{ color: primaryColor }}
          >
            Forget Password
          </h1>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <div>
            <div className="mt-6">
              <label className="text-gray-700 font-medium mb-1 block">
                Email
              </label>
              <input
                className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                style={{ border: `1px solid ${borderColor}` }}
                type="email"
                placeholder="Enter your email..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 text-white mt-4 flex items-center justify-center gap-2 px-2 py-2 rounded-lg border font-semibold cursor-pointer transition duration-200"
              style={{ border: `1px solid ${borderColor}` }}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Send OTP"
              )}
            </button>
            <p className="text-red-500 text-center my-2.5 md:hidden">{err}</p>
          </div>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <div>
            <div className="mt-6">
              <label className="text-gray-700 font-medium mb-1 block">
                OTP
              </label>
              <input
                className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                style={{ border: `1px solid ${borderColor}` }}
                type="number"
                placeholder="Enter your OTP..."
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>

            <button
              onClick={verifiyotp}
              className="w-full bg-blue-500 text-white mt-4 flex items-center justify-center gap-2 px-2 py-2 rounded-lg border font-semibold cursor-pointer transition duration-200"
              style={{ border: `1px solid ${borderColor}` }}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Verify OTP"
              )}
            </button>
            <p className="text-red-500 text-center my-2.5 md:hidden">{err}</p>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div>
            <div className="mt-6">
              <label className="text-gray-700 font-medium mb-1 block">
                New Password
              </label>
              <input
                className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                style={{ border: `1px solid ${borderColor}` }}
                type="password"
                placeholder="New password..."
                onChange={(e) => setNewPassword(e.target.value)}
                value={newpassword}
              />
            </div>

            <div className="mt-6">
              <label className="text-gray-700 font-medium mb-1 block">
                Confirm Password
              </label>
              <input
                className="w-full rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                style={{ border: `1px solid ${borderColor}` }}
                type="password"
                placeholder="Confirm password..."
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmpassword}
              />
            </div>

            <button
              onClick={changePassword}
              className="w-full bg-blue-500 text-white mt-4 flex items-center justify-center gap-2 px-2 py-2 rounded-lg border font-semibold cursor-pointer transition duration-200"
              style={{ border: `1px solid ${borderColor}` }}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Reset Password"
              )}
            </button>
            <p className="text-red-500 text-center my-2.5 md:hidden">{err}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
