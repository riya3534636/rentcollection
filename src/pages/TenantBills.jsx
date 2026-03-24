// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const TenantBills = () => {
//   const [bills, setBills] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userData } = useSelector((state) => state.user);

//   const generateBills = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:3100/api/bill/getTenatBill",
//         {
//           withCredentials: true,
//         },
//       );

//       console.log(res.data); // { bills: [...], pendingBills: [...] }

//       setBills(res.data.bills); // local state
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   const handlePayNow = async (billId) => {
//     try {
//       console.log(billId);

//       const res = await axios.post(
//         `http://localhost:3100/api/payment/create-order/${billId}`,
//         {}, // empty body
//         { withCredentials: true }, // config
//       );

//       openRazorpay(res.data);
//     } catch (error) {
//       console.error(error.response?.status, error.response?.data);
//     }
//   };

//   const verifyPayment = async (response, billId) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3100/api/payment/verifiy",
//         {
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,
//           billId,
//         },
//       );

//       if (res.data.success) {
//         alert("Payment verified & bill updated");
//       } else {
//         alert("Verification failed");
//       }
//     } catch (error) {
//       console.error(error.response?.status, error.response?.data);
//     }
//   };

//   const openRazorpay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID, // frontend key
//       amount: order.amount,
//       currency: "INR",
//       order_id: order.orderId,
//       name: "Rent Payment",
//       description: "Monthly Rent",
//       handler: function (response) {
//         verifyPayment(response, order.billId);
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   // const handleAutoPay = async (bill) => {
//   //   const res = await axios.post(
//   //     "http://localhost:3100/api/payment/create-subscription",
//   //     {
//   //       amount: bill.totalAmount,
//   //       tenantId: userData._id,
//   //     },
//   //   );

//   //   const subscriptionId = res.data.subscriptionId;

//   //   const options = {
//   //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//   //     subscription_id: subscriptionId,
//   //     name: "Rent Payment",
//   //     description: "Auto Monthly Rent",
//   //   };

//   //   const rzp = new window.Razorpay(options);
//   //   rzp.open();
//   // };

//   const handleAutoPay = async (bill) => {
//   try {
//     const res = await axios.post(
//       "http://localhost:3100/api/payment/create-subscription",
//       {
//         billId: bill._id,
//       }
//     );

//     const subscription = res.data;

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       subscription_id: subscription.id,
//       name: "Rent Auto Pay",
//       description: "Monthly Rent",
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();

//   } catch (error) {
//     console.error(error.response?.data || error.message);
//   }
// };

//   useEffect(() => {
//     generateBills();
//   }, []);

//   const statusColor = (status) => {
//     if (status === "Paid") return "bg-green-100 text-green-700";
//     if (status === "Overdue") return "bg-red-100 text-red-700";
//     return "bg-yellow-100 text-yellow-700";
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-semibold mb-6">My Bills</h1>

//       {bills.length === 0 ? (
//         <div className="text-center text-gray-500 mt-20">
//           No bills available yet
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {bills.map((bill) => (
//             <div key={bill._id} className="bg-white rounded-lg shadow p-5">
//               {/* Header */}
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-medium">
//                   {bill.month} {bill.year}
//                 </h2>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm ${statusColor(bill.status)}`}
//                 >
//                   {bill.status}
//                 </span>
//               </div>

//               {/* Bill details */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                 <div>
//                   <p className="text-gray-500">Rent</p>
//                   <p className="font-medium">₹{bill.rentAmount}</p>
//                 </div>

//                 <div>
//                   <p className="text-gray-500">Water</p>
//                   <p className="font-medium">₹{bill.waterAmount}</p>
//                 </div>

//                 <div>
//                   <p className="text-gray-500">
//                     Electricity ({bill.unitsUsed} units)
//                   </p>
//                   <p className="font-medium">₹{bill.electricityAmount}</p>
//                 </div>

//                 <div>
//                   <p className="text-gray-500">Total</p>
//                   <p className="font-semibold text-blue-600">
//                     ₹{bill.totalAmount}
//                   </p>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="flex justify-between items-center mt-5 border-t pt-4">
//                 <p className="text-sm text-gray-500">
//                   Due Date:{" "}
//                   <span className="font-medium text-gray-700">
//                     {new Date(bill.dueDate).toLocaleDateString()}
//                   </span>
//                 </p>

//                 {bill.status === "Paid" ? (
//                   <button
//                     onClick={() => navigate(`/view/recipt/${bill._id}`)}
//                     className="px-4 py-2 text-sm rounded bg-gray-100 text-gray-600"
//                   >
//                     View Receipt
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handlePayNow(bill._id)}
//                     className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
//                   >
//                     Pay Now
//                   </button>
//                 )}

//                 <button
//                   className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
//                   onClick={() => handleAutoPay(bill)}
//                 >
//                   Enable Auto Pay
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TenantBills;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TenantBills = () => {
  const [bills, setBills] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const generateBills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3100/api/bill/getTenatBill",
        { withCredentials: true }
      );

      console.log(res.data); // { bills: [...], pendingBills: [...] }
      setBills(res.data.bills); // local state
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handlePayNow = async (billId) => {
    try {
      console.log(billId);

      const res = await axios.post(
        `http://localhost:3100/api/payment/create-order/${billId}`,
        {},
        { withCredentials: true }
      );

      openRazorpay(res.data);
    } catch (error) {
      console.error(error.response?.status, error.response?.data);
    }
  };

  const verifyPayment = async (response, billId) => {
    try {
      const res = await axios.post("http://localhost:3100/api/payment/verifiy", {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        billId,
      });

      if (res.data.success) {
        alert("Payment verified & bill updated");
        generateBills(); // refresh bills after payment
      } else {
        alert("Verification failed");
      }
    } catch (error) {
      console.error(error.response?.status, error.response?.data);
    }
  };

  const openRazorpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      order_id: order.orderId,
      name: "Rent Payment",
      description: "Monthly Rent",
      handler: function (response) {
        verifyPayment(response, order.billId);
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleAutoPay = async (bill) => {
    try {
      const res = await axios.post(
        "http://localhost:3100/api/payment/create-subscription",
        { billId: bill._id }
      );

      const subscription = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        subscription_id: subscription.id,
        name: "Rent Auto Pay",
        description: "Monthly Rent",
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    generateBills();
  }, []);

  const statusColor = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Overdue") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">My Bills</h1>

      {bills.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No bills available yet
        </div>
      ) : (
        <div className="space-y-6">
          {bills.map((bill) => (
            <div key={bill._id} className="bg-white rounded-lg shadow p-5">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  {bill.month} {bill.year}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor(
                    bill.status
                  )}`}
                >
                  {bill.status}
                </span>
              </div>

              {/* Bill details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Rent</p>
                  <p className="font-medium">₹{bill.rentAmount}</p>
                </div>

                <div>
                  <p className="text-gray-500">Water</p>
                  <p className="font-medium">₹{bill.waterAmount}</p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Electricity ({bill.unitsUsed} units)
                  </p>
                  <p className="font-medium">₹{bill.electricityAmount}</p>
                </div>

                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-semibold text-blue-600">
                    ₹{bill.totalAmount}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-5 border-t pt-4">
                <p className="text-sm text-gray-500">
                  Due Date:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(bill.dueDate).toLocaleDateString()}
                  </span>
                </p>

                {bill.status === "Paid" ? (
                  <button
                    onClick={() => navigate(`/view/recipt/${bill._id}`)}
                    className="px-4 py-2 text-sm rounded bg-gray-100 text-gray-600"
                  >
                    View Receipt
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePayNow(bill._id)}
                      className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Pay Now
                    </button>

                    {/* <button
                      className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => handleAutoPay(bill)}
                    >
                      Enable Auto Pay
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenantBills;