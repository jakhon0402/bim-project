import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProSidebar from "./components/Sidebar";
import StatisticsPage from "./pages/StatisticsPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./pages/Login/authSlice";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import IncomesPage from "./pages/IncomesPage/IncomesPage";
import OutgoingsPage from "./pages/OutcomesPage/OutgoingsPage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import EmployeePage from "./pages/EmployeesPage/EmployeePage";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div className='flex flex-col w-screen'>
      <Navbar />
      <div className='flex flex-row h-fit'>
        <ProSidebar />
        <div className='grow flex flex-col w-[500px] bg-neutral-100 overflow-y-scroll h-[calc(100vh_-_90px)]'>
          {" "}
          <Routes>
            <Route path='/incomes' element={<IncomesPage />} />
            <Route path='/outgoings' element={<OutgoingsPage />} />
            <Route path='/statistics' element={<StatisticsPage />} />
            <Route path='/categories' element={<CategoriesPage />} />
            <Route path='/employees/:id' element={<EmployeePage />} />
            <Route path='/employees' element={<EmployeesPage />} />
            <Route path='/inventory' element={<InventoryPage />} />
            <Route path='/*' element={<Navigate to='/incomes' />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
