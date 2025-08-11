import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data = [] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#312e81" />
      <XAxis dataKey="name" stroke="#e2e8f0" fontSize={12} />
      <YAxis stroke="#e2e8f0" fontSize={12} />
      <Tooltip
        contentStyle={{
          background: "#1e1b4b",
          color: "#e2e8f0",
          borderRadius: "8px",
          border: "none",
        }}
      />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#6366f1"
        strokeWidth={3}
        dot={{ r: 4, stroke: "#6366f1", fill: "#fff" }}
        activeDot={{ r: 6, fill: "#6366f1" }}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default Chart;
