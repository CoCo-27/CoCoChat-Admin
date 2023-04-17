import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import uploadServices from 'src/services/uploadServices';

const PromptModal = ({ showModal, setShowModal }) => {
  const [value, setValue] = useState('');

  const handleValue = () => {
    uploadServices
      .prompt(value)
      .then((result) => {
        console.log(result);
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
      onOk={() => handleValue()}
      onCancel={() => setShowModal(false)}
      width={600}
    >
      <input
        type="text"
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Modal>
  );
};

export default PromptModal;
