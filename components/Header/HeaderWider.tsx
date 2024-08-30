import React from "react";
import HeaderContent from "./HeaderContent";

const Header = () => {
  return (
    <div className="fixed z-50 flex h-[60px] w-screen justify-center bg-white shadow-lg">
      <div className="relative flex h-full w-full">
        <HeaderContent />
      </div>
    </div>
  );
};

export default Header;
