import React from 'react'

 const stats = [
  { title: "Total Properties", value: 5 },
  { title: "Total Tenants", value: 12 },
  { title: "This Month Rent", value: "₹85,000" },
  { title: "Pending Payments", value: 3 }
];

const recentBills = [
  {
    id: 1,
    property: "Green Villa",
    tenant: "Rahul",
    month: "Feb 2026",
    amount: "₹12,500",
    status: "Pending"
  },
  {
    id: 2,
    property: "Blue Apartments",
    tenant: "Anita",
    month: "Feb 2026",
    amount: "₹15,000",
    status: "Paid"
  }
];

const maintenanceRequests = [
  {
    id: 1,
    property: "Green Villa",
    issue: "Water leakage",
    status: "Open",
    date: "08 Feb 2026"
  },
  {
    id: 2,
    property: "Blue Apartments",
    issue: "Electrical issue",
    status: "Resolved",
    date: "06 Feb 2026"
  }
];

const OwnerDashboards = () => {
  return (
    <div className="p-6 space-y-8">
      
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-sm border"
          >
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Recent Bills */}
      <div className="bg-white rounded-lg shadow-sm border p-5">
        <h2 className="text-lg font-semibold mb-4">
          Recent Bills
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">Property</th>
                <th>Tenant</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBills.map((bill) => (
                <tr key={bill.id} className="border-b last:border-0">
                  <td className="py-3">{bill.property}</td>
                  <td>{bill.tenant}</td>
                  <td>{bill.month}</td>
                  <td>{bill.amount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          bill.status === "Paid"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {bill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white rounded-lg shadow-sm border p-5">
        <h2 className="text-lg font-semibold mb-4">
          Maintenance Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-2">Property</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceRequests.map((req) => (
                <tr key={req.id} className="border-b last:border-0">
                  <td className="py-3">{req.property}</td>
                  <td>{req.issue}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          req.status === "Resolved"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>{req.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
  


export default OwnerDashboards