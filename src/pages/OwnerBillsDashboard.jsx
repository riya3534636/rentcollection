import axios from "axios";
import { ArrowLeft, Receipt, CreditCard, Clock, Eye } from "lucide-react"; // Added icons
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BillsPage() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();
  

  const getBills = async () => {
    try {
      const result = await axios.get(
        "http://localhost:3100/api/bill/getOwnerBills",
        { withCredentials: true },
      );
      setBills(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  const totalPending = bills
    .filter((b) => b.status === "Pending")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const lastPaid = bills
    .filter((b) => b.status === "Paid")
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];

  const nextDue = bills
    .filter((b) => b.status === "Pending")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      {/* Top Navigation */}
      <button
        onClick={() => navigate("/ownerDashboard")}
        className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to Dashboard</span>
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Billing History</h1>
          <p className="text-slate-500 mt-1">Manage and track your monthly rental statements</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
           <span className="text-indigo-700 font-medium text-sm">Total Records: {bills.length}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-red-50 p-3 rounded-xl text-red-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Pending</p>
            <p className="text-2xl font-bold text-slate-900">₹{totalPending.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Last Paid</p>
            <p className="text-2xl font-bold text-slate-900">₹{(lastPaid?.totalAmount || 0).toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
            <Receipt size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Next Due</p>
            <p className="text-2xl font-bold text-slate-900">
              {nextDue ? new Date(nextDue.dueDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' }) : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Bills Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Month / Year</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Rent</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Electricity</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Water</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Grand Total</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bills.map((bill, index) => (
                <tr key={bill._id || index} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {bill.month} <span className="text-slate-400 font-normal">{bill.year}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">₹{bill.rentAmount}</td>
                  <td className="px-6 py-4 text-slate-600">₹{bill.electricityAmount}</td>
                  <td className="px-6 py-4 text-slate-600">₹{bill.waterAmount}</td>
                  <td className="px-6 py-4">
                    <span className="text-indigo-600 font-bold">₹{bill.totalAmount}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(bill.dueDate).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    {bill.status === "Paid" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/owner/billDetails/${bill._id}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bills.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400">No billing records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}