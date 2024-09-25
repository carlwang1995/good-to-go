import React from "react";
import HeaderWiderContent from "./HeaderWiderContent";

const Header = () => {
  return (
    <nav className="fixed z-50 flex h-[60px] w-screen justify-center bg-white shadow-lg max-[980px]:bg-white/30 max-[980px]:shadow-none">
      <div className="relative mx-4 flex h-full w-full">
        <HeaderWiderContent />
      </div>
    </nav>
  );
};

export default Header;
