import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  CreditCard,
  Wrench,
  User,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"


const TenantLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

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

  const navItems = [
    { name: "Home", path: "/tenant/dashboard", icon: Home },
    { name: "My Bills", path: "/tenant/bills", icon: FileText },
    // { name: "Payments", path: "/tenant/payments", icon: CreditCard },
    { name: "Maintenance", path: "/tenant/maintenance", icon: Wrench },
    { name: "Profile", path: "/tenant/profile", icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Sidebar */}
      <aside
        className={`fixed z-50 inset-y-0 left-0 w-64 bg-[#0F172A] text-slate-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-all duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col shadow-xl`}
      >
        <div className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Home size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">RentHub</span>
          </div>
          <button className="md:hidden hover:text-white" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon size={20} className={`${isActive(item.path) ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200 px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setIsOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">
              {navItems.find(item => isActive(item.path))?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 pr-3 hover:bg-slate-100 rounded-full transition-all"
              >
                <img
                  src="https://i.pravatar.cc/150?u=tenant"
                  alt="User"
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-slate-200"
                />
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in zoom-in duration-200">
                   <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                    <p className="text-sm font-semibold truncate">Alex Thompson</p>
                  </div>
                  <Link to="/tenant/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                    <User size={16} /> My Profile
                  </Link>
                  <button onClick={handlelogout} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TenantLayout;