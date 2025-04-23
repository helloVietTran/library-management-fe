import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Select } from "antd";

import BoxContent from "@/components/BoxContent";
import useBooksCount from "../hooks/useBooksCount";
import useBorrowedCount from "../hooks/useBorrowedCount";
import useBorrowedCountStats from "../hooks/useBorrowedCountStats";

ChartJS.register(ArcElement, Tooltip, Legend);

const { Option } = Select;

interface BookOverviewProps {
  openOverview: boolean;
}

const BookOverview: React.FC<BookOverviewProps> = ({
  openOverview,
}) => {
  const { data: booksCountData } = useBooksCount();
  const { data: borrowedCountData } = useBorrowedCount();
  const { data: borrowedCountStatsData } = useBorrowedCountStats();

  console.log(borrowedCountStatsData);
  const data = {
    labels: borrowedCountStatsData?.map((item) => item.label + " lượt") || [],
    datasets: [
      {
        data: borrowedCountStatsData?.map((item) => item.count) || [],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0"],
        hoverBackgroundColor: ["#45A049", "#FB8C00", "#1E88E5", "#8E24AA"],
      },
    ],
  };

  const options = {
    cutout: "65%",
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div
      className={`
          user-overview grid grid-cols-12 gap-4 mb-4 transition-all duration-500 
          ${openOverview ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none h-[0px] overflow-hidden"}
          `}
    >
      <BoxContent className="col-span-7">
        <div className="flex justify-between items-center mb-2">
          <div className="text-gray-600 font-medium">Phân loại theo:</div>
          <Select
            defaultValue="Lượt mượn"
            size="middle"
          >
            <Option value="1">Lượt mượn</Option>
          </Select>
        </div>
        <div className="flex items-center gap-4">

          <div style={{ width: "150px", height: "150px" }}>
            <Doughnut data={data} options={options} />
          </div>

          <div style={{ flex: 1, paddingLeft: "15px" }}>
            <ul>
              {data.labels.map((label, index) => (
                <li key={index} className="flex items-center mb-2">
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: data.datasets[0].backgroundColor[index],
                      marginRight: "6px",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span className="text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BoxContent>

      <div className="flex gap-4 col-span-5">
        <BoxContent
          className="relative basis-[50%] p-3 text-gray-600
                  bg-[url('/img/bg/overview-bg-7.jpg')] bg-cover bg-center"
        >
          <div className="text-gray-600 font-medium">Số sách</div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold"
          >
            {booksCountData?.quantity}
          </div>
        </BoxContent>
        <BoxContent
          className="relative basis-[50%] p-3 text-gray-600
                  bg-[url('/img/bg/overview-bg-6.jpg')] bg-cover bg-center"
        >
          <div className="text-gray-600 font-medium">Đang cho mượn</div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold"
          >
            {borrowedCountData?.quantity}
          </div>
        </BoxContent>
      </div>
    </div>
  );
};

export default BookOverview;