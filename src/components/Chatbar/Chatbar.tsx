import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMessagesOff, IconPlus, IconHome } from '@tabler/icons-react';
import { notification } from 'antd';

import Question from '../Question/Question';
import questionServices from 'src/services/questionServices';
import uploadServices from 'src/services/uploadServices';

const Chatbar = ({ setLoading }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const [questionArray, setQuestionArray] = useState([]);
  const [promptValue, setPromptValue] = useState([]);
  const [selectIndex, setSelectIndex] = useState('');

  useEffect(() => {
    questionServices
      .getQuestion()
      .then((result) => {
        setQuestionArray(result.data.data);
      })
      .catch((error) => {});

    uploadServices
      .getPrompt()
      .then((result) => {
        setPromptValue(result.data.data);
      })
      .catch((error) => {});
  }, []);

  const gotoDashBoard = () => {
    navigate('/dashBoard');
  };

  const handleShowModal = (index) => {
    setSelectIndex(index);
    setShowModal(true);
  };

  const handleSave = (text, index) => {
    const array = Array.from(questionArray);
    array[index] = text;

    setLoading(true);
    questionServices
      .editQuestion(array)
      .then((result) => {
        setEditable(false);
        setLoading(false);
        setQuestionArray(result.data.data);
        notification.success({
          description: result.data.message,
          message: '',
          duration: 2,
        });
      })
      .catch((error) => {
        setLoading(false);
        notification.error({
          description: error.response.message,
          message: '',
          duration: 2,
        });
      });
  };

  const handleEdit = (index) => {
    setSelectIndex(index);
    setEditable(!editable);
  };

  return (
    <div
      className={`fixed top-0 bottom-0 z-50 flex h-full w-1/6 flex-none flex-col space-y-2 bg-gray-800 p-4 transition-all sm:relative sm:top-0`}
    >
      <div>
        <button
          className="flex w-full gap-3 items-center cursor-pointer select-none rounded-md p-4 text-[14px] leading-normal bg-blue-400 text-white transition-colors duration-200 hover:bg-gray-500/10"
          onClick={() => gotoDashBoard()}
        >
          <IconHome size={18} />
          Admin Dash Board
        </button>

        <button className="flex w-full gap-3 items-center cursor-pointer select-none rounded-md border border-white/20 p-4 mt-4 text-[14px] leading-normal text-white transition-colors duration-200 hover:bg-gray-500/10">
          <IconPlus size={18} />
          New Question
        </button>
      </div>
      <div className="flex-grow overflow-auto">
        <div className="flex border-b border-white/20 pb-2 pr-2">
          <div className="flex w-full flex-col ">
            <label className="flex text-white font-bold text-xl justify-center mt-8 mb-4 underline-offset-4">
              QUICK QUESTION
            </label>
            {questionArray.length > 0 ? (
              questionArray.map((item, index) => {
                return (
                  <div key={index}>
                    <Question
                      index={index}
                      name={item}
                      onClick={handleShowModal}
                      onSave={handleSave}
                      editable={editable}
                      onEdit={handleEdit}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      promptValue={promptValue}
                      setPromptValue={setPromptValue}
                      setSelect={setSelectIndex}
                      select={selectIndex}
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col gap-3 items-center text-sm leading-normal mt-8 text-white opacity-50">
                <IconMessagesOff />
                No Questions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbar;
