import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./PieChart.css";

const COLORS = [
  "#0088FE", // Blue
  "#00C49F", // Green
  "#FFBB28", // Yellow
  "#FF8042", // Orange
  "#AF19FF", // Purple
];

// Process and group data by category
const processDataForPieChart = (data) => {
  const categories = {};

  data.forEach((item) => {
    const price = parseFloat(item.price); // Allow decimals
    if (!isNaN(price)) {
      if (categories[item.category]) {
        categories[item.category] += price;
      } else {
        categories[item.category] = price;
      }
    }
  });

  return Object.keys(categories).map((category, i) => ({
    id: i,
    name: category,
    value: categories[category],
  }));
};

const RoundChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="no-data-text">No data to display</p>;
  }

  const processedData = processDataForPieChart(data);

  return (
    <div className="chart" data-cy="round-chart">
      <PieChart width={300} height={300}>
        <Pie
          data={processedData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={true}
        >
          {processedData.map((entry) => (
            <Cell
              key={`cell-${entry.id}`}
              fill={COLORS[entry.id % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default RoundChart;
