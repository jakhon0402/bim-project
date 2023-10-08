import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className='flex flex-row bg-primary px-8 py-5'>
      <img src={logo} className='h-[50px]' />
    </div>
  );
};

export default Navbar;
