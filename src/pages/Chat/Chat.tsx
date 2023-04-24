import React, { useState } from 'react';
import { Spin } from 'antd';
import Chatbar from 'src/components/Chatbar/Chatbar';
import ChatMiddle from 'src/components/Chat/Chat';
import ChatRight from 'src/components/ChatRight/ChatRight';

const Chat = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`flex h-screen w-full pt-[48px] sm:pt-0 ${
        loading === true ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {loading ? (
        <div className="absolute w-full h-full z-10 flex justify-center items-center">
          <Spin
            tip="Loading..."
            spinning={loading}
            size="large"
            style={{ width: '100%' }}
          ></Spin>
        </div>
      ) : (
        <></>
      )}
      <Chatbar setLoading={setLoading} />
      <ChatMiddle setLoading={setLoading} />
      <ChatRight />
    </div>
  );
};

export default Chat;
