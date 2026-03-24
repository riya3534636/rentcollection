import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";

const TenantMaintenance = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  const getMyIssues = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/maintenace/getMyIssue`,
        { withCredentials: true }
      );
      setIssues(res.data.maintenance); // save array to state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyIssues();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Maintenance Requests
        </h1>
        <button
          onClick={() => navigate("/tenant/RaiseRequest")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Raise Request
        </button>
      </div>

      {/* Maintenance Cards */}
      <div className="grid gap-6">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className={`bg-white rounded-xl shadow p-5 border-l-4 ${
              issue.status === "resolved"
                ? "border-green-500"
                : issue.status === "in_progress"
                ? "border-blue-500"
                : "border-yellow-500"
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                {issue.category.charAt(0).toUpperCase() +
                  issue.category.slice(1)}
              </h2>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  issue.status === "resolved"
                    ? "bg-green-100 text-green-700"
                    : issue.status === "in_progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {issue.status.replace("_", " ")}
              </span>
            </div>

            <p className="text-gray-500 mt-2 text-sm">{issue.description}</p>

            <p className="text-xs text-gray-400 mt-3">
              Requested on:{" "}
              {new Date(issue.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantMaintenance;
