import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Barchart: React.FC<{
  data: { date: string; count: number; verified: number }[];
  xKey: string;
  yKey: string;
}> = ({ data = [], xKey = "", yKey = "" }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis label={{ value: yKey, angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />

        <Bar dataKey="verified" fill="#16a34a" />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
