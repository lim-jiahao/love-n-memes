import React, { useState, useRef } from 'react';
import axios from 'axios';

const MemeUploadForm = ({ memes, setMemes }) => {
  const [file, setFile] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  const fileInputRef = useRef();

  const checkType = (curFile) => ['image/png', 'image/jpeg', 'image/gif'].some((type) => curFile.type === type);

  // approx 2MB, if they got meme larger then wtf no
  const checkFileSize = (curFile) => curFile.size <= 2097152;

  const handleFileChange = (e) => {
    const curFile = e.target.files[0];

    if (!curFile) {
      setErrMsg('');
      setFile(null);
      setDisableSubmit(true);
      return;
    }

    const isValidType = checkType(curFile);
    const isValidFileSize = checkFileSize(curFile);

    if (!isValidType || !isValidFileSize) {
      if (!isValidType) setErrMsg('Invalid file type!');
      else setErrMsg('Image too big. Max file size is 2MB.');

      setFile(null);
      setDisableSubmit(true);
      return;
    }
    setFile(curFile);
    setErrMsg('');
    setDisableSubmit(false);
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      const formData = new FormData();
      formData.append('picture', file);
      const resp = await axios.post('/api/profile/picture', formData, config);
      if (resp) {
        setFile(null);
        setDisableSubmit(true);
        setMemes([...memes, resp.data.picture]);
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <form onSubmit={handleImageUpload} className="w-full">
      <div className="w-full">
        <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
          <div className="space-y-1 text-center">

            {file ? <img src={URL.createObjectURL(file)} alt=" preview" /> : (
              <>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-sm text-gray-600 text-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <p className="text-center">Upload a file</p>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={fileInputRef} onChange={handleFileChange} />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
              </>
            ) }

          </div>
        </div>
        <div className="w-full text-center">

          <button className="w-36 mx-auto bg-indigo-700 hover:bg-pink-700 disabled:opacity-50 mt-4 text-white font-bold py-2 px-4 rounded-full" type="submit" value="Upload" disabled={disableSubmit}>Upload</button>
          <p className="text-red-500 font-bold">{errMsg}</p>
        </div>
      </div>
    </form>
  );
};

export default MemeUploadForm;
