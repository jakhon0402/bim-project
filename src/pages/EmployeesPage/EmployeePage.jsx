import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEmployee } from "./employeesSlice";
import { User } from "@nextui-org/react";
import CreateModal from "../../components/Modals/CreateModal";

const EmployeePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployee(id));
  }, []);

  return (
    <div className='flex flex-col items-center bg-white rounded-xl p-5 m-5'>
      <div className='flex flex-row justify-between w-full'>
        <User
          // size='sm'
          name={`${employee?.name} ${employee?.surname}`}
          description={employee?.jobDescription}
          // description="Product Designer"
        />
        <CreateModal btnText="Maoshni o'zgartirish" />
      </div>
    </div>
  );
};

export default EmployeePage;
