import React from 'react';

const Card = (props) => {
  const { children, extra } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ${extra}`}
    >
      {children}
    </div>
  );
};

export default Card;
