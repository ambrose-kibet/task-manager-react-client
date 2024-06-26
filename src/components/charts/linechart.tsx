import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Linechart: React.FC<{
  data: { date: string; count: number; verified: number }[];
  xKey: string;
  yKey: string;
}> = ({ data = [], xKey = "", yKey = "" }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis label={{ value: yKey, angle: -90 }} />
        <Tooltip />
        <Legend />
        <Line dataKey="completed" type="monotone" stroke="#16a34a" />
        <Line dataKey="created" type={"monotone"} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default Linechart;
