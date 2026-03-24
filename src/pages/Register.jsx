import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";

export default function Register() {

  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
 const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
   const dispatch=useDispatch()
  const navigate = useNavigate();

   const handleRegister=async()=>{
        try {
          setIsLoading(true)
          const result=await axios.post("http://localhost:3100/api/user/register",{name,email,password},
            {withCredentials:true}
          )
           dispatch(setCurrentUser(result.data.user))
          
         setErr("")
         setIsLoading(false)

       } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong"); //the error which u recive from backend
    } finally {
      setIsLoading(false);
    }
        
    //      if (result.data.success) {
    //     toast.success(result.data.message);
    //     setErr("");
    //     navigate("/tenant");
    //   } else {
    //     setErr(result.data.message);
    //     toast.error(result.data.message);
    //   }
    // } catch (error) {
    //   setErr(error.response?.data?.message || "Something went wrong");
    //   toast.error(error.response?.data?.message || "Something went wrong"); //the error which u recive from backend
    // } finally {
    //   setIsLoading(false);
    // }


  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-4"
          onChange={(e)=>setname(e.target.value)}
          value={name}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
          onChange={(e)=>setemail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          onChange={(e)=>setpassword(e.target.value)}
          value={password}
        />

        <button onClick={handleRegister} className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
         {isLoading ? (
            <Loader2 className="mr-4 h-4 w-4 animate-spin" />
          ) : (
            "login"
          )}
        </button>

        <p className="text-red-500 text-center my-2.5">{err}</p>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}