import {
  LayoutDashboard,
  Home,
  Users,
  FileText,
  Receipt,
  Wrench,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  // { name: "Dashboard", icon: LayoutDashboard, path: "/owner/dashboard" },
  { name: "Properties", icon: Home, path: "/owner/properties" },
  { name: "Tenants", icon: Users, path: "/owner/tenants" },
  { name: "Agreements", icon: FileText, path: "/owner/agreements" },
  { name: "Bills", icon: Receipt, path: "/owner/bills" },
  { name: "Maintenance", icon: Wrench, path: "/owner/maintenance" }
];

const OwnerSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Dynamic Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-72 bg-[#0F172A] text-slate-300
          transform transition-all duration-300 ease-in-out
          border-r border-slate-800 flex flex-col
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Branding Area */}
        <div className="h-20 flex items-center px-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Home size={18} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Rent<span className="text-indigo-400">Hub</span>
            </h2>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
              Main Menu
            </p>
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-indigo-600/10 text-indigo-400 ring-1 ring-indigo-500/20"
                          : "hover:bg-slate-800/50 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon 
                            size={20} 
                            className={`transition-colors ${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`} 
                          />
                          <span>{item.name}</span>
                        </div>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                        )}
                        {!isActive && (
                          <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-600" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Upgrade Card / Footer */}
        {/* <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-amber-500/20 rounded-lg">
              <Sparkles size={14} className="text-amber-400" />
            </div>
            <span className="text-xs font-bold text-white">Go Pro</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            Unlock advanced analytics and automated invoicing.
          </p>
          <button className="w-full py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-900/20">
            Upgrade Now
          </button>
        </div> */}
      </aside>
    </>
  );
};

export default OwnerSidebar;



