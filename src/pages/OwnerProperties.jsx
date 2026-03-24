import axios from "axios";
import {
  MapPin,
  Home,
  Banknote,
  MoreVertical,
  Plus,
  Building2,
  UserCheck,
  Key,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({ count: 0, occupied: 0, vacant: 0 });
  const [loading, setLoading] = useState(true);

  const getMyProperties = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        "http://localhost:3100/api/property/getAllProperties",
        { withCredentials: true },
      );
      // console.log("API response:", result.data);

      setProperties(result.data.properties);
      setStats({
        count: result.data.count,
        occupied: result.data.occupied,
        vacant: result.data.vacant,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyProperties();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen h-400 space-y-8">
      <div className="mb-10">
        <button
          onClick={() => navigate("/ownerDashboard")}
          className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-3 hover:gap-3 transition-all"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      </div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Properties
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track your real estate portfolio performance.
          </p>
        </div>

        <button
          onClick={() => navigate("/addProperty")}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <Plus size={18} />
          <span>Add Property</span>
        </button>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Total Properties",
            value: stats.count,
            icon: Building2,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Occupied",
            value: stats.occupied,
            icon: UserCheck,
            color: "text-green-600",
            bg: "bg-green-50",
          },
          {
            label: "Vacant Units",
            value: stats.vacant,
            icon: Key,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Properties Grid */}
      {loading ? (
        <p className="text-gray-500">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-gray-500">
          No properties found. Add your first one!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property._id}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.propertyName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-sm
                      ${
                        property.Status?.toLowerCase() === "occupied"
                          ? "bg-green-500/90 text-white"
                          : "bg-amber-500/90 text-white"
                      }`}
                  >
                    {property.Status}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {property.propertyName}
                    </h2>
                    <div className="flex items-center gap-1 text-gray-400 mt-1">
                      <MapPin size={14} />
                      <p className="text-xs">{property.address}</p>
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                      <Home size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">
                        Type
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        {property.propertyType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <Banknote size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">
                        Monthly
                      </p>
                      <p className="text-sm font-bold text-indigo-600">
                        ₹{property.rent || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() =>
                      navigate(`/viewDetailsProperty/${property._id}`)
                    }
                    className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
                  >
                    View Details
                  </button>
                  {/* <button   className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors">
                    Delete
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
