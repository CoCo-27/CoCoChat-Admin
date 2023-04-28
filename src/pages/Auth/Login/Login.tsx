import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';

import authServices from 'src/services/authServices';
import setAuthToken from 'src/utils/setAuthToken';
import AuthButton from 'src/components/CustomeButton/AuthButton';
import Loading from 'src/components/Icon/loader';
import imgUrl from '../../../assets/img/background.png';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    setLoading(true);
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
        setLoading(false);
        console.log(result);
        localStorage.setItem('email', result.data.data.email);
        localStorage.setItem('token', result.data.data.accessToken);
        setAuthToken(localStorage.getItem('token'));
        setTimeout(() => {
          navigate('/dashBoard');
        }, 500);
      })
      .catch((error) => {
        console.log('error = ', error);
        setLoading(false);
        if (error.response) {
          notification.error({
            description: error.response.data.message,
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

  const handleMode = () => {};

  return (
    <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
      <AuthButton />
      <main className="mx-auto min-h-screen">
        <div className="relative flex">
          <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
            <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
              <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                  <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                    Sign In
                  </h4>
                  <p className="mb-9 ml-1 text-base text-gray-600">
                    Enter your email and password to sign in!
                  </p>
                  <form onSubmit={(e) => handleClick(e)}>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="mail@example.com"
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        required
                        placeholder="password"
                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between px-2">
                      <a
                        className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                        href=""
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <button
                      className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                      type="submit"
                      disabled={loading}
                    >
                      {!loading ? (
                        'Sign In'
                      ) : (
                        <Spin indicator={Loading} style={{ color: 'white' }} />
                      )}
                    </button>
                  </form>
                </div>
              </div>
              <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                <div
                  className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                  style={{
                    backgroundImage: `url(${imgUrl})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
