import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../styles/analytics.css";

function Analytics() {
  const ServerUrl = process.env.REACT_APP_API_URL;
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch(`${ServerUrl}/api/analytics`);

      const data = await response.json();

      setAnalytics(data);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="analytics-page">
      <div className="charts-container">
        <h1>Kudos Given</h1>

        {analytics?.analytics?.length > 0 ? (
          <BarChart
            width={600}
            height={300}
            data={analytics.analytics}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="badge" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalKudos" fill="rgb(22, 114, 235)" />
          </BarChart>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="table-container">
        <h1>Kudos Leaderboard</h1>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th>Name</th>
              <th>Number of Kudos Received</th>
            </tr>
          </thead>
          <tbody>
            {analytics?.analyticsLeaderboard?.map((item, index) => (
              <tr key={index}>
                <td>{item.receiver}</td>
                <td>{item.totalKudos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
