import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import { getMoneyPattern } from "../utils/regex";
import { getIncomeTotalPrice } from "./IncomesPage/incomesSlice";
import { getOutcomeTotalPrice } from "./OutcomesPage/outcomesSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  elements: {
    line: {
      tension: 0.19,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Line Chart",
    // },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Kirim",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "#1A3830",
      backgroundColor: "#1A38304d",
    },
    // {
    //   label: "Dataset 2",
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //   borderColor: "rgb(53, 162, 235)",
    //   backgroundColor: "rgba(53, 162, 235, 0.5)",
    // },
  ],
};

const StatisticsPage = () => {
  const dispatch = useDispatch();
  const { totalPrice: incomeTotalPrice } = useSelector(
    (state) => state.incomes
  );
  const { totalPrice: outcomeTotalPrice } = useSelector(
    (state) => state.outcomes
  );

  useEffect(() => {
    dispatch(getIncomeTotalPrice());
    dispatch(getOutcomeTotalPrice());
  }, []);

  return (
    <div className='flex flex-col w-full h-full p-8 gap-8 bg-neutral-50'>
      <div className='flex flex-row w-full gap-8 items-center'>
        <span className='flex flex-col w-fit items-center bg-red-200/50 text-red-600 rounded-xl px-8 py-3'>
          Chiqim{" "}
          <span className='font-bold'>{`${
            outcomeTotalPrice == 0
              ? 0
              : outcomeTotalPrice
              ? getMoneyPattern(outcomeTotalPrice)
              : ""
          } so'm`}</span>
        </span>
        <span className='flex flex-col w-fit items-center bg-green-200/50 text-green-600 rounded-xl px-8 py-3'>
          Kirim{" "}
          <span className='font-bold'>{`${
            incomeTotalPrice == 0
              ? 0
              : incomeTotalPrice
              ? getMoneyPattern(incomeTotalPrice)
              : ""
          } so'm`}</span>
        </span>
      </div>
      <div className='flex flex-col w-full p-3 bg-white rounded-xl gap-5'>
        <div className='flex flex-row justify-between'>
          <span className='font-bold text-[18px] text-primary'>
            Kirim statistikasi
          </span>
          <div className='flex-none'>
            <Tabs color='primary'>
              <Tab key='monthly' title='Oylik' />
              <Tab key='weekly' title='Haftalik' />
              <Tab key='daily' title='Kunlik' />
            </Tabs>
          </div>
        </div>

        <Line options={options} data={data} className='w-full' />
      </div>
    </div>
  );
};

export default StatisticsPage;
