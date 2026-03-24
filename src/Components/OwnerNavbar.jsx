import { Bell, Menu, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/userSlice";

const OwnerNavbar = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
      const {userData}=useSelector((state)=>state.user)
      const navigate=useNavigate()
      const dispatch=useDispatch()

     const handlelogout = async () => {
    try {
      const result = await axios.post("http://localhost:3100/api/user/logout", {
        withCredentials: true,
      });
      console.log(result.data)
      dispatch(setCurrentUser(null));
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-18 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50 transition-all">
      
      {/* Left section: Branding */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
          onClick={onMenuClick}
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
            <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
            RentManager
          </h1>
        </div>
      </div>

      {/* Right section: Actions */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        
        {/* Notification Bell */}
        <button className="relative p-2.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600 transition-all active:scale-90">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

        {/* Profile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all ${
            open ? "border-indigo-200 bg-indigo-50" : "border-transparent hover:bg-gray-50"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm">
            <User size={18} />
          </div>
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold text-gray-800">{userData.name}</span>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Owner</span>
          </div>
          <ChevronDown size={14} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {/* Animated Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 py-2 animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="px-4 py-2 border-b border-gray-50 mb-1">
              <p className="text-xs text-gray-400 font-medium">Account Settings</p>
            </div>
            
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <User size={16} /> My Profile
            </button>
            {/* <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              <Settings size={16} /> Settings
            </button> */}
            
            <div className="h-[1px] bg-gray-50 my-1"></div>
            
            <button onClick={handlelogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default OwnerNavbar;