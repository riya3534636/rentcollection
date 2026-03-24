import { Link } from "react-router-dom";

const UserHome = () => {
  const actions = [
    { title: 'Pay Rent', icon: '💰', link: '/pay-rent' },
    { title: 'Rental Details', icon: '📄', link: '/rental-details' },
    { title: 'Maintenance', icon: '🛠️', link: '/maintenance' },
    { title: 'Messages', icon: '💬', link: '/messages', badge: 2 },
  ];

  return (
    <div className="min-h-screen h-full  bg-[#f8faff] p-4 flex flex-col items-center justify-center font-sans">
      
      {/* Main Card */}
      <div className="w-full  max-w-lg bg-white rounded-[2rem] shadow-xl shadow-blue-100/40 p-6 mb-8 relative overflow-hidden border border-blue-50">
        <div className="flex items-center gap-4 relative z-10">
          {/* House Illustration Placeholder */}
          <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
            <span className="text-4xl">🏠</span>
          </div>
          
          <div className="flex-1">
            <p className="text-slate-500 text-sm font-medium">Rent for April 2024</p>
            <h1 className="text-3xl font-bold text-slate-800">$1,500</h1>
            <p className="text-slate-400 text-xs">Due by April 5, 2024</p>
          </div>
        </div>

        <a 
          href="/pay-rent" 
          className="mt-6 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white w-full py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200"
        >
          Pay Rent <span>→</span>
        </a>
      </div>

      {/* Quick Actions Section */}
      <div className="w-full max-w-lg">
        <h3 className="text-lg font-bold text-slate-800 mb-4 ml-2">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <a
              key={index}
              href={action.link}
              className="flex items-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              
              <div className="ml-4 flex-1 flex items-center justify-between">
                <span className="font-semibold text-slate-700 text-sm">
                  {action.title}
                </span>
                
                <div className="flex items-center gap-2">
                  {action.badge && (
                    <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {action.badge}
                    </span>
                  )}
                  <span className="text-slate-300 group-hover:text-blue-500 transition-colors">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default UserHome;