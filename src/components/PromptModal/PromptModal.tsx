import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import 'antd/dist/antd';
import uploadServices from 'src/services/uploadServices';

const PromptModal = ({ promptValue, showModal, setShowModal }) => {
  const [value, setValue] = useState('');

  const handleValue = () => {
    uploadServices
      .prompt(value)
      .then((result) => {
        console.log(result);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      title="Prompt Change"
      centered
      open={showModal}
      okButtonProps={{ danger: true }}
      okText={'Save'}
      onOk={() => handleValue()}
      onCancel={() => setShowModal(false)}
      width={600}
    >
      <input
        type="text"
        className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
        defaultValue={promptValue}
        onChange={(e) => setValue(e.target.value)}
      />
    </Modal>
  );
};

export default PromptModal;
