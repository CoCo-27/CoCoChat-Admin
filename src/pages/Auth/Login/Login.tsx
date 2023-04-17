import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd'

import authServices from 'src/services/authServices';
import LoginImage from 'src/components/Icon/LoginImage';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    authServices
      .authLogin(data)
      .then((result) => {
        notification.success({
          description: result.data.message,
          message: '',
        });
        localStorage.setItem('loggedIn', 'true');
        setTimeout(() => {
          navigate('/chat');
        }, 500);
      })
      .catch((error) => {
        console.log('error = ', error);
        if (error.response) {
          notification.error({
            description: `${error.response.data.message}`,
            message: '',
          });
        } else {
          notification.error({
            description: 'Server Error',
            message: '',
          });
        }
      });
  };

  return (
    <div className="flex w-full h-screen">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="h-1/6 py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 17.5H3.5M6.5 12H2M9 6.5H4M17 3L10.4036 12.235C10.1116 12.6438 9.96562 12.8481 9.97194 13.0185C9.97744 13.1669 10.0486 13.3051 10.1661 13.3958C10.3011 13.5 10.5522 13.5 11.0546 13.5H16L15 21L21.5964 11.765C21.8884 11.3562 22.0344 11.1519 22.0281 10.9815C22.0226 10.8331 21.9514 10.6949 21.8339 10.6042C21.6989 10.5 21.4478 10.5 20.9454 10.5H16L17 3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
              Admin Login
            </div>
          </div>
        </div>
        <div className="w-full h-5/6 flex justify-center items-center">
          <div className="w-full px-12 mb-40 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
              Log In
            </h2>
            <div className="mt-12">
              <form onSubmit={(e) => handleClick(e)}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    id="email"
                    className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="mike@gmail.com"
                  />
                </div>
                <div className="mt-8">
                  <div className="flex flex-col ">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                    <input
                      id="password"
                      required
                      className="w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                      type="password"
                      placeholder="Enter your Password"
                    />
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
        <div className="h-1/6 w-full"></div>
        <div className="h-5/6 flex justify-center mb-20 max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <LoginImage />
        </div>
      </div>
    </div>
  );
};

export default Login;
