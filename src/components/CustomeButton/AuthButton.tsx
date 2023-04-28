// Chakra Imports
// Custom Icons
import React, { useState } from 'react';

import { RiMoonFill, RiSunFill } from 'react-icons/ri';

const AuthButton = (props) => {
  const { ...rest } = props;
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme')
      ? JSON.parse(localStorage.getItem('theme'))
      : document.body.classList.contains('dark')
  );

  return (
    <button
      className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandLinear to-blueSecondary p-0"
      onClick={() => {
        if (darkMode) {
          document.body.classList.remove('dark');
          setDarkMode(false);
          localStorage.setItem('theme', JSON.stringify(darkMode));
        } else {
          document.body.classList.add('dark');
          setDarkMode(true);
          localStorage.setItem('theme', JSON.stringify(darkMode));
        }
      }}
      {...rest}
    >
      {/* // left={document.documentElement.dir === "rtl" ? "35px" : ""}
      // right={document.documentElement.dir === "rtl" ? "" : "35px"} */}
      <div className="cursor-pointer text-gray-600">
        {darkMode ? (
          <RiSunFill className="h-4 w-4 text-white" />
        ) : (
          <RiMoonFill className="h-4 w-4 text-white" />
        )}
      </div>
    </button>
  );
};

export default AuthButton;
