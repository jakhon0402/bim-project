import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect } from "react";
import ProTable from "../../components/ProTable";
import { useDispatch, useSelector } from "react-redux";
import {
  createIncome,
  deleteIncome,
  getAllIncomes,
  updateIncome,
} from "./incomesSlice";
import { getAllCategories } from "../Categories/categoriesSlice";
import { fields, emptyValues, validationSchema, columns } from "./data";

const IncomesPage = () => {
  const dispatch = useDispatch();
  const { incomes } = useSelector((state) => state.incomes);

  useEffect(() => {
    dispatch(getAllIncomes());
    dispatch(getAllCategories());
  }, []);

  return (
    <div className='flex flex-col w-full p-8 gap-8 bg-neutral-50 h-full'>
      <div className='flex flex-row w-full gap-8 items-center'>
        <span className='flex flex-col w-full items-center bg-green-200/50 text-green-600 rounded-xl py-3'>
          Kirim <span className='font-bold'>40 000 000 so'm</span>
        </span>

        <div className='flex-none'>
          <Tabs color='primary'>
            <Tab key='monthly' title='Oylik' />
            <Tab key='weekly' title='Haftalik' />
            <Tab key='daily' title='Kunlik' />
          </Tabs>
        </div>
      </div>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <span className='font-bold text-[18px] text-green-600'>
          Kirimlar jadvali
        </span>
        {incomes && (
          <ProTable
            isFilterCtg={true}
            createSubmitHandler={(reqBody) => dispatch(createIncome(reqBody))}
            editSubmitHandler={(reqBody) => dispatch(updateIncome(reqBody))}
            deleteSubmitHandler={(id) => dispatch(deleteIncome({ id }))}
            columns={columns}
            tableData={incomes}
            createData={{
              fields,
              initialValues: emptyValues,
              validationSchema,
            }}
            editData={{ fields, initialValues: emptyValues, validationSchema }}
          />
        )}
      </div>
    </div>
  );
};

export default IncomesPage;
