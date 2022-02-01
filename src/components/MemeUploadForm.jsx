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
    <>
      <form className="flex items-baseline justify-center" onSubmit={handleImageUpload}>
        <input type="file" name="picture" ref={fileInputRef} onChange={handleFileChange} />
        <input className="w-36 bg-indigo-700 hover:bg-pink-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-full" type="submit" value="Upload" disabled={disableSubmit} />
      </form>
      <p className="text-red-500 font-bold">{errMsg}</p>
    </>
  );
};

export default MemeUploadForm;
