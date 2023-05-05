import React, { useEffect, useState } from 'react';
import authServices from 'src/services/authServices';

import Card from 'src/components/Card/Card';

const UserTable = () => {
  let data: JSX.Element = <></>;
  const [userData, setUserData] = useState([]);
  const tableInstance: any = ['NAME', 'EMAIL', 'TYPE', 'DATE'];

  useEffect(() => {
    authServices
      .getUserAll()
      .then((result) => {
        setUserData(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
      <div className="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              {tableInstance.map((value, index) => {
                return (
                  <th
                    key={index}
                    scope="col"
                    className="border-b border-gray-200 pr-28 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {value}
                    </p>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => {
              return (
                <tr key={index}>
                  {tableInstance.map((value, index) => {
                    if (value === 'NAME') {
                      data = (
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                          {item.first_name} {item.last_name}
                        </p>
                      );
                    } else if (value === 'EMAIL') {
                      data = (
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                          {item.email}
                        </p>
                      );
                    } else if (value === 'TYPE') {
                      data = (
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                          {item.type === '0' ? 'Google Auther' : 'Email Auther'}
                        </p>
                      );
                    } else if (value === 'DATE') {
                      data = (
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                          23/04/26
                        </p>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default UserTable;
