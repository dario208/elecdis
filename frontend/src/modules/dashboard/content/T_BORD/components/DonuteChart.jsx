import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ColorChartInformation from "@/components/ColorChartInformation";

export default function DonuteChart({ chartConfig, chartData = [], title, label }) {
  const totalValue = useMemo(() => {
    if (!chartData || chartData.length === 0) return 0; 
    return chartData.reduce((sum, data) => sum + data.value, 0);
  }, [chartData]);
  return (
    <div className="w-full p-5 flex flex-col shadow-combined rounded-xl max-w-full h-[65vh] bg-white max-sm:w-full ">
      <h1 className="text-[#212B36] font-bold mb-4">{title}</h1>
      <div className="pb-0 h-auto w-full">
        <ChartContainer
          config={chartConfig}
          className="w-full mx-auto aspect-square max-h-full"
        >
          <PieChart width="100%" height="100%">
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={100}
              outerRadius={200}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <ColorChartInformation config={chartConfig} padding={0} className="mt-3" position="start" />
    </div>
  );
}
