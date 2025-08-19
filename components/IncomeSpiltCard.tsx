"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Income split by categories";

const chartData = [
  {
    category: "Bank Balance",
    amount: 76809,
    color: "text-chart-1",
    fill: "var(--chart-1)",
  },
  {
    category: "Investments",
    amount: 34500,
    color: "text-chart-2",
    fill: "var(--chart-2)",
  },
  {
    category: "Borrowed",
    amount: 21500,
    color: "text-chart-3",
    fill: "var(--chart-3)",
  },
];

const chartConfig = {
  amount: {
    label: "Amount",
  },
  bank: {
    label: "Bank Balance",
    color: "var(--chart-1)",
  },
  investment: {
    label: "Investments",
    color: "var(--chart-2)",
  },
  loan: {
    label: "Borrowed",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const IncomeSplitCard = () => {
  const totalIncome = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Income Split</CardTitle>
        <CardDescription>Overview of your income distribution</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={80}
              strokeWidth={10}
              labelLine={false}
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
                          className="fill-foreground text-xl font-bold"
                        >
                          ₹{totalIncome.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-sm"
                        >
                          Total Income
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className=" grid grid-cols-3 text-center justify-center w-full">
          {chartData.map((item) => {
            const percentage = ((item.amount / totalIncome) * 100).toFixed(1);
            return (
              <div key={item.category} className="flex flex-col py-1">
                <span className="font-medium text-xs mb-1">
                  {item.category}
                </span>
                <span className={`font-semibold ${item.color}`}>
                  ₹{item.amount.toLocaleString()}
                </span>
                <span className=" text-muted-foreground">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
};

export default IncomeSplitCard;
