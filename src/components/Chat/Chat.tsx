import React, { useState, useRef, useEffect } from 'react';
import { message, Upload, notification } from 'antd';
import { UploadFile } from 'antd/es/upload';
import ChatMessage from '../ChatMessage/ChatMessage';
import uploadServices from 'src/services/uploadServices';

import './Chat.css';

const { Dragger } = Upload;

const Chat = () => {
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileRealName, setFileRealName] = useState('');
  const [promptValue, setPromptValue] = useState('');
  const [array, setArray] = useState([]);
  const req_qa_box = useRef(null);

  const props = {
    name: 'file',
    action: 'http://localhost:9000/upload/file',
    onChange: (info) => {
      setFiles(info.fileList);
      if (info.file.status === 'done') {
        // Handle response from API
        setFileRealName(info.file.response.originalname);
        setFileName(info.file.response.filename);
        notification.success({
          description: `${info.file.response.originalname} Upload Success`,
          message: '',
        });
      }
    },
    files,
    beforeUpload: (info: UploadFile) => {
      console.log('BEFORE = ', info);
      if (info.type !== 'application/pdf') {
        notification.error({
          description: `${info.name} Upload Failed`,
          message: '',
        });
        return Upload.LIST_IGNORE;
      }
    },
  };

  useEffect(() => {
    req_qa_box.current.scrollTop = req_qa_box.current.scrollHeight;
  }, []);

  const handleEmbedding = (e) => {
    e.preventDefault();
    setFiles([]);
    uploadServices
      .embedding(fileName)
      .then((result) => {
        console.log('result = ', result);
        notification.success({
          description: `${result.data}`,
          message: '',
        });
      })
      .catch((error) => {
        console.log('Emb = ', error);
      });
  };

  const handleCancel = (e) => {
    setFileName('');
  };

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleMessage();
    }
  };

  const handleMessage = async () => {
    setFormValue('');
    const save = array.slice();
    save.push({ message: formValue });
    save.push({ message: '...' });
    setArray(save);
    const response = await uploadServices.requestMessage(formValue);
    const data = await response.json();
    console.log(data);
    const update = save.slice();
    update[update.length - 1].message = data.text;
    setArray(update);
  };

  return (
    <div className="flex w-4/6 min-w-min">
      <div className="h-full flex flex-col flex-1 justify-between pl-24 pr-24 py-4 duration-500 overflow-hidden relative bg-white">
        <div className="h-full flex flex-col">
          <div className="relative flex w-full flex-col p-2 rounded-md border border-black/10 shadow-[0_0_10px_rgba(0,0,0,0.10)] ">
            <textarea
              ref={inputRef}
              className="m-0 w-full resize-none border-0 overflow-hidden bg-transparent py-2 text-black dark:bg-transparent dark:text-white md:py-2 md:pl-4"
              value={promptValue}
              placeholder="WELCOME TO 'PROGRAM' SIMPLY DROP YOUR FILE OR PASTE YOUR TEXT AND THEN ASK A QUICK QUESTION OR ASK YOUR OWN"
              onChange={(e) => setPromptValue(e.target.value)}
              style={{
                maxHeight: '400px',
                height: '44px',
              }}
            />
          </div>
          <div
            ref={req_qa_box}
            className="relative flex w-full h-32 flex-grow flex-col mt-4 rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] overflow-y-auto overflow-x-hidden"
          >
            {array &&
              array.map((item, index) => {
                return (
                  <ChatMessage
                    key={index}
                    box_ref={req_qa_box}
                    message={item.message}
                    status={index % 2 === 0 ? true : false}
                  />
                );
              })}
          </div>

          {fileName ? (
            <div className="flex flex-row w-full gap-16 justify-center">
              <button
                className="w-1/3 h-auto bg-red-900 text-white font-medium font-bold py-2 px-4 mt-4 rounded opacity-50"
                onClick={(e) => handleEmbedding(e)}
              >
                {fileRealName} Embedding
              </button>
              <button
                className="w-1/3 h-auto bg-blue-500 text-white font-medium font-bold py-2 px-4 mt-4 rounded opacity-50"
                onClick={(e) => handleCancel(e)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <Dragger
              {...props}
              className="mt-4 rounded-lg cursor-pointer bg-gray-50 h-32"
              maxCount={1}
            >
              <p className="ant-upload-drag-icon flex justify-center">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
              </p>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </Dragger>
          )}
        </div>

        <div className="relative flex w-full flex-col mt-4 p-2 rounded-md border border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] ">
          <input
            ref={inputRef}
            className="m-0 w-full resize-none border-0 overflow-hidden bg-transparent py-2 pr-8 text-black dark:bg-transparent dark:text-white md:py-2 md:pl-4"
            value={formValue}
            placeholder="SELECT A QUICK QUESTION OR ASK YOUR OWN QUESTION HERE........."
            onChange={(e) => setFormValue(e.target.value)}
            style={{
              maxHeight: '400px',
              height: '44px',
            }}
            onKeyDown={(e) => handlePressEnter(e)}
          />
          <button
            className="absolute right-2 top-2 rounded-sm m-3 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900"
            onClick={() => handleMessage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="tabler-icon tabler-icon-send"
            >
              <path d="M10 14l11 -11"></path>
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
