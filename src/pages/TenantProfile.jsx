import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "../main";

const Profile = () => {
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
   const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/tenant/getMyProfile`, {
        withCredentials: true,
      });
        console.log(res.data)
      if (res.data.success) {
        setTenant(res.data.tenant);
        
        
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>

      {loading ? (
        <p className="text-gray-500">Loading profile...</p>
      ) : !tenant ? (
        <p className="text-gray-500">No tenant assigned to this user.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT SIDE - Profile Image */}
          <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r pb-6 md:pb-0 md:pr-8">
            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
              className="w-36 h-36 rounded-full shadow-md mb-4"
            />
            <h2 className="text-xl font-semibold">{tenant.name}</h2>
            <p className="text-gray-500 text-sm">{tenant.email}</p>

            <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Change Photo
            </button>
          </div>

          {/* RIGHT SIDE - Details */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                type="text"
                value={tenant.name}
                disabled
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <input
                type="text"
                value={tenant.phone || "N/A"}
                disabled
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                value={tenant.email}
                disabled
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Room Number */}
            <div>
              <label className="text-sm text-gray-500">Room / Flat</label>
              <input
                type="text"
                value={tenant.property?.propertyType || "Not Assigned"}
                disabled
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Property Name */}
            <div>
              <label className="text-sm text-gray-500">Property Name</label>
              <input
                type="text"
                value={tenant.property?.propertyName || "Not Assigned"}
                disabled
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>

            {/* Move-in Date */}
            <div>
              <label className="text-sm text-gray-500">Move-in Date</label>
              <input
                type="text"
                value={
                  tenant.createdAt
                    ? new Date(tenant.createdAt).toLocaleDateString()
                    : "N/A"
                }
                disabled
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
