import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect } from "react";
import ProTable from "../../components/ProTable";
import { fields, emptyValues, validationSchema, columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import {
  createOutcome,
  deleteOutcome,
  getAllOutcomes,
  updateOutcome,
} from "./outcomesSlice";
import { getAllCategories } from "../Categories/categoriesSlice";

const OutgoingsPage = () => {
  const dispatch = useDispatch();
  const { outcomes } = useSelector((state) => state.outcomes);

  useEffect(() => {
    dispatch(getAllOutcomes());
    dispatch(getAllCategories());
  }, []);

  return (
    <div className='flex flex-col w-full h-full p-8 gap-8 bg-neutral-50'>
      <div className='flex flex-row w-full gap-8 items-center'>
        <span className='flex flex-col w-full items-center bg-red-200/50 text-red-600 rounded-xl py-3'>
          Chiqim <span className='font-bold'>40 000 000 so'm</span>
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
        <span className='font-bold text-[18px] text-red-600'>
          Chiqimlar jadvali
        </span>
        {outcomes && (
          <ProTable
            isFilterCtg={true}
            createSubmitHandler={(reqBody) => dispatch(createOutcome(reqBody))}
            editSubmitHandler={(reqBody) => dispatch(updateOutcome(reqBody))}
            deleteSubmitHandler={(id) => dispatch(deleteOutcome({ id }))}
            columns={columns}
            tableData={outcomes}
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

export default OutgoingsPage;
