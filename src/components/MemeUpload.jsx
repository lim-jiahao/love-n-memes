import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/outline';

const MemeUpload = () => {
  const [memes, setMemes] = useState([]);
  const [file, setFile] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

        const resp = await axios.get('/api/profile/picture', headers);
        setMemes(resp.data.pictures);
      } catch (err) {
        console.error(err.response);
      }
    })();
  }, []);

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

  const handleImageClick = async (filename) => {
    try {
      await axios.delete(`/api/profile/picture/${filename}`);
      const memesCopy = [...memes].filter((meme) => meme.filename !== filename);
      setMemes(memesCopy);
    } catch (err) {
      console.error(err.response);
    }
  };
  return (
    <div className="flex flex-col items-center">
      {memes.length > 0
        ? (
          <div className="flex flex-wrap w-1/2 mb-2">
            {memes.map((meme, index) => (
              <div className="flex flex-col w-1/3 justify-end items-center mb-3">
                <img width={120} height={120} className="mr-1 transition-transform hover:scale-[4]" src={`/${meme.filename}`} alt={`meme-${index}`} />
                <TrashIcon onClick={() => handleImageClick(meme.filename)} className="mt-1 h-4 w-4 cursor-pointer hover:scale-125" />
              </div>
            ))}
          </div>
        ) : <p className="font-bold mb-2">No memes yet! Get uploading!</p>}

      {memes.length < 9 ? (
        <>
          <form className="flex items-baseline justify-center" onSubmit={handleImageUpload}>
            <input type="file" name="picture" ref={fileInputRef} onChange={handleFileChange} />
            <input className="w-36 bg-indigo-700 hover:bg-pink-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-full" type="submit" value="Upload" disabled={disableSubmit} />
          </form>
          <p className="text-red-500 font-bold">{errMsg}</p>
        </>
      ) : (
        <p className="text-center text-red-500 font-bold">
          Max 9 memes allowed!
          <br />
          Delete an existing meme if you wish to upload a new meme.
        </p>
      )}
    </div>
  );
};

export default MemeUpload;
