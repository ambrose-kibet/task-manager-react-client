import { getMyStatsQuery } from "@/routes/stats-page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CountStats = () => {
  const { data } = useQuery({
    ...getMyStatsQuery(),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="grid w-full grid-cols-2 sm:grid-cols-3">
      <div className="flex w-fit flex-col items-center justify-center">
        <div className="mx-auto h-20 w-20">
          <CircularProgressbar
            value={60}
            text={`${data?.total}`}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.25,
              strokeLinecap: "round",
              textSize: "24px",
              pathTransitionDuration: 0.5,
              // Colors
              pathColor: `${"hsl(142.1 70.6% 45.3%)"}`,
              textColor: `${"hsl(142.1 70.6% 45.3%)"}`,
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
        <h3 className="text-xl font-bold text-primary">Totals Tasks</h3>
      </div>
      <div className="flex w-fit flex-col items-center justify-center">
        <div className="mx-auto h-20 w-20">
          <CircularProgressbar
            value={60}
            text={`${data?.completed}`}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.25,
              strokeLinecap: "round",
              textSize: "24px",
              pathTransitionDuration: 0.5,
              // Colors
              pathColor: `${"hsl(142.1 70.6% 45.3%)"}`,
              textColor: `${"hsl(142.1 70.6% 45.3%)"}`,
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
        <h3 className="text-xl font-bold text-primary">Completed Tasks</h3>
      </div>
      <div className="col-span-2 mx-auto flex w-fit flex-col items-center justify-center sm:col-span-1">
        <div className="mx-auto h-20 w-20">
          <CircularProgressbar
            value={60}
            text={`${data?.longestStreak}`}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.25,
              strokeLinecap: "round",
              textSize: "24px",
              pathTransitionDuration: 0.5,
              // Colors
              pathColor: `${"hsl(142.1 70.6% 45.3%)"}`,
              textColor: `${"hsl(142.1 70.6% 45.3%)"}`,
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
        <h3 className="text-xl font-bold text-primary">Longest Tasks Streak</h3>
      </div>
    </div>
  );
};

export default CountStats;
