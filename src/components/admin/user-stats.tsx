import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Barchart from "../charts/barchart";
import { getSignUpStatsQuery } from "@/routes/admin-page";
const UserStats: React.FC = () => {
  const [duration, setDuration] = useState<"daily" | "weekly" | "monthly">(
    "daily",
  );

  const { data: userStats } = useQuery({
    ...getSignUpStatsQuery(duration),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="relative mx-auto h-[500px] w-screen max-w-xs sm:max-w-screen-sm lg:max-w-screen-lg">
      <div className="absolute right-0 top-0 z-10 flex flex-col justify-center shadow">
        <Select
          onValueChange={(value: "daily" | "weekly" | "monthly") =>
            setDuration(value)
          }
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder={duration} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Barchart
        data={userStats}
        yKey={`${duration} user sign ups`}
        xKey={"date"}
      />
    </div>
  );
};
export default UserStats;
