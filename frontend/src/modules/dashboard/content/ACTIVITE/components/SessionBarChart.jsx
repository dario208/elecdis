import ColorChartInformation from "@/components/ColorChartInformation";
import { CardContent } from "@/components/ui/card";
import CalendarFilter from "@/modules/dashboard/component/CalendarFilterDay";
import { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { handleChageDate } from "../features/chartSessionSlice";
export default function SessionBarChart({
  sessionConfig,
  data,
  loading,
  erreur,
}) {
  const [tickLength, setTickLength] = useState(3);
  useEffect(() => {
    const updateTickLength = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 500) {
        setTickLength(3);
      } else if (screenWidth <= 768) {
        setTickLength(3);
      } else if (screenWidth <= 1366) {
        setTickLength(3);
      } else {
        setTickLength(3);
      }
    };

    updateTickLength();
    window.addEventListener("resize", updateTickLength);

    return () => window.removeEventListener("resize", updateTickLength);
  }, []);
  return (
    <div className="col-span-2 max-sm:w-full max-sm:col-span-1 shadow-combined rounded-xl w-full h-full bg-white">
      <div className="flex justify-between w-full items-center flex-wrap px-6 py-5">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-[#212B36] font-bold ">
            Sessions et utilisateurs unique 24h passé
          </h2>
          <CalendarFilter
            filter="test"
            className="right-0"
            action={handleChageDate}
          />
        </div>
      </div>
      <ColorChartInformation
        config={sessionConfig}
        padding="0"
        position="center"
        className="pl-6 pb-6 pr-7"
      />
      <CardContent>
        <div className="w-full">
          {loading ? (
            <p>Loading...</p>
          ) : erreur ? (
            <p>erreur...</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={data}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value.slice(0, 2)}h`} 
                  angle={-25} 
                  tick={{ fontSize: 14, fill: "#888" }} // Taille et couleur ajustées
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickCount={6}
                  domain={[0, 10]}
                  interval={0}
                  scale="linear"
                />
                <Tooltip cursor={false} />
                <Bar
                  dataKey="nombreSession"
                  fill={sessionConfig.nombreSession.color}
                  barSize={8}
                  radius={3}
                />
                <Line
                  type="monotone"
                  dataKey="uniqueUsers"
                  stroke={sessionConfig.uniqueUsers.color}
                  strokeWidth={3}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </div>
  );
}
