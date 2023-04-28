import React from 'react';
import { MdBarChart, MdDashboard } from 'react-icons/md';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';

import Widget from '../../components/Widget/Widget';
import TotalSpent from './Components/TotalSpent';
import Weekly from './Components/Weekly';

const DashBoard = () => {
  return (
    <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
      <div>
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={'Earnings'}
            subtitle={'$340.5'}
          />
          <Widget
            icon={<IoDocuments className="h-6 w-6" />}
            title={'Spend this month'}
            subtitle={'$642.39'}
          />
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={'Sales'}
            subtitle={'$574.34'}
          />
          <Widget
            icon={<MdDashboard className="h-6 w-6" />}
            title={'Your Balance'}
            subtitle={'$1,000'}
          />
          <Widget
            icon={<MdBarChart className="h-7 w-7" />}
            title={'New Tasks'}
            subtitle={'145'}
          />
          <Widget
            icon={<IoMdHome className="h-6 w-6" />}
            title={'Total Projects'}
            subtitle={'$2433'}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <TotalSpent />
          <Weekly />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2"></div>
      </div>
    </div>
  );
};

export default DashBoard;
