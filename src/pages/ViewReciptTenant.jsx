import axios from "axios";
import { ArrowLeft, Download, Printer, CheckCircle2, Building2, User, CreditCard } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewReciptTenant = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  const getRecipt = async () => {
    try {
      const res = await axios.get(`http://localhost:3100/api/recipt/${id}`, {
        withCredentials: true,
      });
      setReceipt(res.data.receipt);
    } catch (error) {
      console.error("Receipt fetch error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getRecipt();
  }, []);

  const handlePrint = () => {
   
  };

const downloadReceipt = async (billId) => {
  try {
    const res = await axios.get(
      `http://localhost:3100/api/recipt/${id}/pdf`,
      {
        responseType: "blob", // ensures we get binary data
        withCredentials: true, // if your backend requires cookies
      }
    );

    // Create a blob URL
    const url = window.URL.createObjectURL(res.data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `receipt-${id}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Receipt download error:", error.response?.data || error.message);
  }
};


  if (!receipt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Fetching your receipt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      {/* Print Specific Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          .print-shadow { shadow: none !important; border: 1px solid #eee; }
          body { background: white; }
        }
      `}} />

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden print-shadow">
        
        {/* Navigation / Actions Bar */}
        <div className="no-print bg-white border-b px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/tenant/bills")}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Bills
          </button>
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              title="Print Receipt"
            >
              <Printer size={20} />
            </button>
            <button onClick={()=>downloadReceipt(receipt._id)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
              <Download size={18} />
              <span className="text-sm font-semibold">Download PDF</span>
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12 relative">
          {/* Status Watermark */}
          <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none">
             <CheckCircle2 size={180} />
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-100 pb-8 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-indigo-600">
                <Building2 size={24} />
                <span className="font-bold tracking-tight text-xl">PROPERTY RENTAL</span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Receipt</h1>
              <p className="text-gray-500 mt-1">Receipt ID: <span className="text-gray-900 font-mono">{receipt.receiptNo}</span></p>
            </div>
            
            <div className="text-left md:text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
                Payment Successful
              </div>
              <p className="text-gray-500 text-sm italic">Paid on {new Date(receipt.paidAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Main Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
            {/* From/To */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <User size={14} /> Property Details
                </h3>
                <p className="font-bold text-gray-800 text-lg leading-tight">{receipt.property}</p>
                <p className="text-gray-600">Owner: {receipt.owner}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Billed To</h3>
                <p className="font-bold text-gray-800">{receipt.tenant?.name}</p>
                <p className="text-gray-600">{receipt.tenant?.email}</p>
              </div>
            </div>

            {/* Payment Summary Box */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Summary</h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Method</span>
                        <span className="font-semibold text-gray-800 flex items-center gap-1">
                            <CreditCard size={14} /> Razorpay
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Transaction ID</span>
                        <span className="font-mono text-gray-700">{receipt.paymentId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono text-gray-700">{receipt.orderId}</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-12">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b-2 border-gray-900">
                  <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                  <th className="py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-6">
                    <p className="font-bold text-gray-800">Rent Payment</p>
                    <p className="text-sm text-gray-500">Billing Period: {receipt.month} {new Date(receipt.createdAt).getFullYear()}</p>
                  </td>
                  <td className="py-6 text-right font-medium text-gray-900">₹{receipt.amount.toLocaleString()}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-900">
                  <td className="py-6 text-lg font-bold text-gray-900">Total Amount Paid</td>
                  <td className="py-6 text-right text-2xl font-black text-indigo-600">₹{receipt.TotalAmount.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer Note */}
          <div className="mt-16 pt-8 border-t border-gray-100 text-center">
            <div className="flex justify-center mb-4">
                <div className="h-1 w-12 bg-indigo-100 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              This is a digital receipt and does not require a physical signature. <br />
              Thank you for choosing <span className="font-semibold text-gray-600">{receipt.property}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReciptTenant;