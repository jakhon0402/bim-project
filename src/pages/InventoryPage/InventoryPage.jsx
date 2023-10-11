import { Tab, Tabs } from "@nextui-org/react";
import React, { useEffect } from "react";
import ProTable from "../../components/ProTable";
import { useDispatch, useSelector } from "react-redux";
import { fields, emptyValues, validationSchema, columns } from "./data";
import {
  createInventory,
  deleteInventory,
  getAllInventory,
  getAllInventoryByDateRange,
  updateInventory,
} from "./inventorySlice";
import { DateRangePicker } from "rsuite";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { inventory } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(getAllInventory());
  }, []);

  return (
    <div className='flex flex-col w-full p-8 gap-8 bg-neutral-50 h-full'>
      <div className='flex flex-col p-3 bg-white rounded-xl gap-5'>
        <div className='flex flex-row justify-between'>
          <span className='font-bold text-[18px] text-green-600'>
            Inventory jadvali
          </span>
          <DateRangePicker
            placement='bottomEnd'
            onChange={(date) => {
              if (date) {
                dispatch(
                  getAllInventoryByDateRange({
                    startDate: date[0].toISOString(),
                    endDate: date[1].toISOString(),
                  })
                );
              } else {
                dispatch(getAllInventory());
              }
            }}
          />
        </div>
        {inventory && (
          <ProTable
            isFilterCtg={false}
            createSubmitHandler={(reqBody) =>
              dispatch(createInventory(reqBody))
            }
            editSubmitHandler={(reqBody) => dispatch(updateInventory(reqBody))}
            deleteSubmitHandler={(id) => dispatch(deleteInventory({ id }))}
            columns={columns}
            tableData={inventory}
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

export default InventoryPage;
