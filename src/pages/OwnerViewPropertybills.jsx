

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const statusStyle = (status) => {
  if (status === "Paid") return "bg-green-100 text-green-700";
  if (status === "Pending") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

export default function OwnerViewPropertyBills() {
  const { singleProperty } = useSelector((state) => state.owner);
  const { id } = useParams(); // route must be /owner/property/:propertyId/bills
  const [bills, setBills] = useState([]);

  const fetchbills=async()=>{
    try {
        const result=await axios.get(`http://localhost:3100/api/bill/getBillsByProperty/${id}`,{
            withCredentials:true
        })
        console.log(result.data)
    } catch (error) {
        console.error(error)
    }
  }
   useEffect(()=>{
    fetchbills();
   },[])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Property Info */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h2 className="text-xl font-semibold">
          {singleProperty?.propertyName || "Property"}
        </h2>
        <p className="text-gray-500">{singleProperty?.address || ""}</p>
        <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
          {singleProperty?.status || "Occupied"}
        </span>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Property Bills</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left p-3">Month</th>
                <th className="text-left p-3">Tenant</th>
                <th className="text-left p-3">Due Date</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Total</th>
                <th className="text-center p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {bills.map((bill) => (
                <tr key={bill._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {bill.month} {bill.year}
                  </td>
                  <td className="p-3">{bill.tenant?.name}</td>
                  <td className="p-3">
                    {new Date(bill.dueDate).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                        bill.status
                      )}`}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">₹{bill.totalAmount}</td>
                  <td className="p-3 text-center">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {bills.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No bills found for this property
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}