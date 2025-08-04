"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { getRevernueWeekly, getRevernueMonthly } from "@/services/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const dayMap: { [key: string]: string } = {
  Monday: "Thứ 2",
  Tuesday: "Thứ 3",
  Wednesday: "Thứ 4",
  Thursday: "Thứ 5",
  Friday: "Thứ 6",
  Saturday: "Thứ 7",
  Sunday: "CN",
};

const RevenueAndVisitsChart = () => {
  const [labelsWeekly, setLabelsWeekly] = useState<string[]>([]);
  const [labelsMonthly, setLabelsMonthly] = useState<string[]>([]);
  const [revenuesWeekly, setRevenuesWeekly] = useState<number[]>([]);
  const [revenuesMonthly, setRevenuesMonthly] = useState<number[]>([]);

  useEffect(() => {
    const fetchWeeklyRevenue = async () => {
      try {
        const data = await getRevernueWeekly();

        const labelList = data.map((item: any) => {
          const [engDay] = item.day.split(" ");
          return dayMap[engDay] || engDay;
        });

        const revenueList = data.map((item: any) => item.revenue);

        setLabelsWeekly(labelList);
        setRevenuesWeekly(revenueList);
      } catch (err) {
        console.error("Lỗi khi fetch doanh thu tuần:", err);
      }
    };

    fetchWeeklyRevenue();
  }, []);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const data = await getRevernueMonthly();

        const labelList = data.map((item: any) => item.day); // giữ nguyên "01/08", "02/08", ...
        const revenueList = data.map((item: any) => item.revenue);

        setLabelsMonthly(labelList);
        setRevenuesMonthly(revenueList);
      } catch (err) {
        console.error("Lỗi khi fetch doanh thu tháng:", err);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  const revenueData = {
    labels: labelsWeekly,
    datasets: [
      {
        label: "Doanh thu theo tuần (VNĐ)",
        data: revenuesWeekly,
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "rgba(0, 123, 255, 1)",
      },
    ],
  };

  const revenueMonthlyData = {
    labels: labelsMonthly,
    datasets: [
      {
        label: "Doanh thu theo tháng (VNĐ)",
        data: revenuesMonthly,
        backgroundColor: "rgba(40, 167, 69, 0.5)",
        borderColor: "rgba(40, 167, 69, 1)",
        borderWidth: 1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line" | "bar">) {
            const value = context.raw as number;
            const label = context.dataset.label;

            return `${label ?? ""}: ${value.toLocaleString("vi-VN")} ₫`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (tickValue: string | number) {
            return typeof tickValue === "number"
              ? tickValue.toLocaleString("vi-VN")
              : tickValue;
          },
        },
      },
    },
  };

  return (
    <div className="charts-wrapper">
      <div className="chart-container">
        <h3>📊 Doanh thu theo tuần</h3>
        <Line data={revenueData} options={commonOptions} />
      </div>

      <div className="chart-container">
        <h3>📈 Doanh thu theo tháng</h3>
        <Bar data={revenueMonthlyData} options={commonOptions} />
      </div>
    </div>
  );
};

export default RevenueAndVisitsChart;
