import React, { useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd';
import uploadServices from 'src/services/uploadServices';

const PromptModal = ({
  promptValue,
  setPromptValue,
  showModal,
  setShowModal,
  index,
}) => {
  const [value, setValue] = useState('');

  const handleValue = () => {
    const data = {
      index: index,
      value: value,
    };
    uploadServices
      .prompt(data)
      .then((result) => {
        setPromptValue(result.data.data);
        setShowModal(false);
      })
      .catch((error) => {});
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
        defaultValue={promptValue[index]}
        onChange={(e) => setValue(e.target.value)}
      />
    </Modal>
  );
};

export default PromptModal;
