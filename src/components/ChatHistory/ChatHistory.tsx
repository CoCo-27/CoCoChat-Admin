import React from 'react';

const ChatHistory = () => {
  return (
    <div className="relative flex items-center">
      <button className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-4 text-sm transition-colors duration-200 hover:bg-[#343541]/90 ">
        <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-[12.5px] text-white leading-3 pr-12">
          Chat History
        </div>
      </button>
      <div className="absolute right-1 z-10 flex text-gray-300">
        <button className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tabler-icon tabler-icon-trash"
          >
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatHistory;
