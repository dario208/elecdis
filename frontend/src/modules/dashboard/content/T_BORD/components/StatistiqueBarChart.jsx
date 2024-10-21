import { useEffect, useState } from "react";
import ButtonFilter from "./ButtonFilter";
import { FILTER } from "@/_mock/constant";
import ButtonFilterYear from "./ButtonFilterYear";
import ColorChartInformation from "@/components/ColorChartInformation";
import { CardContent } from "@/components/ui/card";
import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function StatistiqueBarChart({ title, chartData, description, listFilterYearly, statiStiqueConfig, loading }) {
  const { oldvalue, currentValue, barconfig } = statiStiqueConfig;  
  const [tickLength, setTickLength] = useState(3);

  useEffect(() => {
    const updateTickLength = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 500) {
        setTickLength(1);
      } else if (screenWidth <= 768) {
        setTickLength(2);
      } else {
        setTickLength(4);
      }
    };

    updateTickLength(); 
    window.addEventListener('resize', updateTickLength);
    
    return () => window.removeEventListener('resize', updateTickLength);
  }, []);

  // Vérifier si chartData est défini avant d'essayer de l'utiliser
  const roundedChartData = chartData ? chartData.map(item => ({
    ...item,
    currentValue: Math.round(item.currentValue), // Arrondir currentValue
    oldValue: Math.round(item.oldValue), // Arrondir oldValue
  })) : [];

  
  return (
    <div className="shadow-combined rounded-xl w-full h-full bg-white">
      <div className="flex justify-between w-full items-center flex-wrap px-6 py-5">
        <div>
          <h2 className="text-[#212B36] font-bold">{title}</h2>
          {description}
        </div>
        <div className="flex justify-between items-center gap-2">
          <ButtonFilter filter="bar" listFilter={FILTER} />
          <ButtonFilterYear listFilter={listFilterYearly} />
        </div>
      </div>
      <ColorChartInformation config={statiStiqueConfig} padding="0" position="center" className="pl-6 pb-6 pr-7"/>
      <CardContent>
        <div className="w-full h-[50vh]">
          {loading ? <p>Loading...</p> : <ResponsiveContainer width="100%" height="100%">
          {roundedChartData.length > 0 && (
            <ComposedChart data={roundedChartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, tickLength)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickCount={6}
                domain={[0, 500]}
                interval={0}
                scale="linear"
              />
              <Tooltip cursor={false} />
              <Bar
                dataKey="currentValue" 
                fill={barconfig.color} 
                barSize={8} 
                radius={3}
              />
              <Line
                type="monotone"
                dataKey="oldValue"
                stroke={oldvalue.color}
                strokeWidth={3}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="currentValue"
                stroke={currentValue.color}
                strokeWidth={3}
                fill="rgba(242, 80, 93, 0.2)"
                dot={false} 
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>}
        </div>
      </CardContent>
    </div>
  );
}
