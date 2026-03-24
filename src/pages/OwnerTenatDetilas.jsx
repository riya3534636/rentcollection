import axios from "axios";
import {
  ArrowLeft,
  LogOut,
  Trash2,
  Calendar,
  MapPin,
  User,
  FileText,
  CreditCard,
} from "lucide-react";
// import { Tool } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { serverUrl } from "../main";

const TenantViewDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);
  const [agreement, setAgreement] = useState(null);
  const [billTotals, setBillTotals] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    due: 0,
  });

  const [users, setusers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/user/tenant-users`,
        { withCredentials: true },
      );
      // console.log(res.data.users);
      setusers(res.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const assignTenantToUsers = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/tenant/assign-tenant`,
        {
          tenantId: tenant._id,
          userId: selectedUser,
        },
      );

      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const viewDetailsTenant = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/tenant/getTenantViewDetails/${id}`,
        { withCredentials: true },
      );
      setTenant(result.data.tenant);
      setAgreement(result.data.agreement);
    } catch (error) {
      console.error(error);
    }
  };

  const removeTenantByProperty = async () => {
    if (!id || !window.confirm("Are you sure you want to vacate this tenant?"))
      return;
    try {
      const result = await axios.delete(
        `${serverUrl}/api/tenant/RemoveVacateTenant/${id}`,
        { withCredentials: true },
      );
      alert(result.data.message);
      navigate("/owner/tenants");
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteTenant = async () => {
    if (
      !id ||
      !window.confirm("Permanent Delete? This action cannot be undone.")
    )
      return;
    try {
      const result = await axios.delete(
        `${serverUrl}/api/tenant/DeleteTenant/${id}`,
        { withCredentials: true },
      );
      alert(result.data.message);
      navigate("/owner/tenants");
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const billsDetails = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/bill/getBillsByTenant/${id}`,
        { withCredentials: true },
      );

      const { bills, totals } = result.data;

      // compute total count of bills
      const totalCount = bills.length;

      setBillTotals({
        total: totalCount,
        paid: totals.paid,
        pending: totals.pending,
        due: totals.due,
      });
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAllUsers();
    viewDetailsTenant();
    billsDetails();
  }, [id]);

  if (!tenant) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* TOP NAVIGATION BAR */}
      <div className="bg-white border-b sticky top-0 z-10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/owner/tenants")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {tenant?.name}
              </h1>
              {/* <p className="text-xs text-gray-500 flex items-center gap-1">
                ID: {id?.slice(-8).toUpperCase()} • Joined {new Date(tenant?.createdAt).toLocaleDateString()}
              </p> */}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={removeTenantByProperty}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 font-semibold text-sm transition-all"
            >
              <LogOut size={16} /> Vacate
            </button>
            <button
              onClick={deleteTenant}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-sm transition-all"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: TENANT & PROPERTY */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROFILE SECTION */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2 text-gray-800 font-bold">
              <User size={18} className="text-indigo-600" /> General Information
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <Info label="Full Name" value={tenant?.name} />
              <Info label="Phone Number" value={tenant?.phone} />
              <Info label="Email Address" value={tenant?.email} />
              <Info
                label="Verification"
                value={
                  tenant?.verified ? (
                    <span className="text-green-600 flex items-center gap-1 italic">
                      Verified Verified ✅
                    </span>
                  ) : (
                    "Pending"
                  )
                }
              />
            </div>
          </section>

          {/* PROPERTY SECTION */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2 text-gray-800 font-bold">
              <MapPin size={18} className="text-indigo-600" /> Assigned Property
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {tenant?.property?.propertyName}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <Info label="Location" value={tenant?.property?.address} />
                <Info
                  label="Rent"
                  value={`₹${agreement?.rentAmount}`}
                  highlight
                />
                <Info
                  label="Bedrooms"
                  value={`${tenant?.property?.bedrooms} BHK`}
                />
                <Info label="Bathrooms" value={tenant?.property?.bathrooms} />
                <Info
                  label="Parking"
                  value={tenant?.property?.hasParking ? "Available" : "No"}
                />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: AGREEMENT & STATS */}
        <div className="space-y-6">
          {/* AGREEMENT CARD */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-800 font-bold">
                <FileText size={18} className="text-indigo-600" /> Lease
              </div>
              <span
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${agreement?.status ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
              >
                {agreement?.status || "Draft"}
              </span>
            </div>
            <div className="p-6 space-y-4">
              <Info
                label="Start Date"
                value={
                  agreement?.startDate
                    ? new Date(agreement.startDate).toLocaleDateString()
                    : "N/A"
                }
              />
              <Info
                label="End Date"
                value={
                  agreement?.endDate
                    ? new Date(agreement.endDate).toLocaleDateString()
                    : "N/A"
                }
              />
              <div className="pt-4 border-t grid grid-cols-2 gap-4">
                <Info label="Water" value={`₹${agreement?.waterCharge}`} />
                <Info
                  label="Electricity"
                  value={`₹${agreement?.electricityCharge}`}
                />
              </div>
              <div className="mt-2 p-3 bg-indigo-50 rounded-lg">
                <p className="text-xs text-indigo-600 font-semibold mb-1">
                  Payment Due Date
                </p>
                <p className="text-sm font-bold text-indigo-900">
                  Day {agreement?.dueDate} of every month
                </p>
              </div>
            </div>
          </section>

          {/* <section className="flex items-center gap-4 mt-6">
            <label htmlFor="userSelect" className="font-semibold text-gray-700">
              Assign tenant to user:
            </label>

            <select
              id="userSelect"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>

            <button
              onClick={assignTenantToUsers}
              disabled={!selectedUser}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-md shadow-md transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed"
            >
              Assign Tenant
            </button>
          </section> */}

          {/* Only show assignment section if tenant is not already linked to a user */}
          {!tenant.user ? (
            <section className="flex items-center gap-4 mt-6">
              <label
                htmlFor="userSelect"
                className="font-semibold text-gray-700"
              >
                Assign tenant to user:
              </label>

              <select
                id="userSelect"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">-- Select User --</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>

              <button
                onClick={assignTenantToUsers}
                disabled={!selectedUser}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-md shadow-md transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed"
              >
                Assign Tenant
              </button>
            </section>
          ) : (
            <div className="mt-6 text-green-700 font-semibold">
              Tenant is already assigned to user: {tenant.name || "N/A"}
            </div>
          )}

          {/* BILLS SUMMARY */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 text-gray-800 font-bold mb-4">
              <CreditCard size={18} className="text-indigo-600" /> Financials
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatCard title="Total" value={billTotals.total} />
              <StatCard title="Paid" value={billTotals.paid} color="green" />
              <StatCard
                title="Pending"
                value={billTotals.pending}
                color="yellow"
              />
              <StatCard
                title="Total Due"
                value={`₹${billTotals.due}`}
                color="red"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Info = ({ label, value, highlight }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
      {label}
    </span>
    <span
      className={`text-sm font-semibold ${highlight ? "text-indigo-600 text-base" : "text-gray-700"}`}
    >
      {value || "—"}
    </span>
  </div>
);

const StatCard = ({ title, value, color }) => {
  const colors = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    yellow: "bg-amber-50 text-amber-700 border-amber-100",
    red: "bg-rose-50 text-rose-700 border-rose-100",
  };
  return (
    <div
      className={`rounded-xl p-3 border ${colors[color] || "bg-gray-50 border-gray-100"}`}
    >
      <p className="text-[10px] uppercase font-bold opacity-70 mb-1">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
};

const MaintenanceStat = ({ label, value, color }) => {
  const colors = {
    green: "text-emerald-400",
    orange: "text-orange-400",
  };
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase text-gray-400 font-bold">{label}</p>
      <p className={`text-xl font-bold ${colors[color] || "text-white"}`}>
        {value}
      </p>
    </div>
  );
};

export default TenantViewDetails;
