import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import Logout from './Logout.jsx';

const Profile = ({ user, setAuth }) => {
  const [file, setFile] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

        const resp = await axios.get('/api/profile/picture', headers);
        setMemes(resp.data.pictures);

        // const curUser = await axios.get('/api/user');
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
    <>
      <div>
        <div>
          <span>
            Currently logged in as
            {' '}
            {user}
          </span>
          <Logout setAuth={setAuth} />
        </div>
        {memes.length > 0
          ? (
            <div className="flex">
              {memes.map((meme, index) => (
                <div className="flex flex-col justify-end">
                  <img width={100} height={100} src={meme.filename} alt={`meme-${index}`} />
                  <button type="button" onClick={() => handleImageClick(meme.filename)}>X</button>
                </div>
              ))}
            </div>
          ) : <p>No memes yet! Get uploading!</p>}
        <form onSubmit={handleImageUpload}>
          <input type="file" name="picture" ref={fileInputRef} onChange={handleFileChange} />
          <input type="submit" value="Upload" disabled={disableSubmit} />
        </form>
        <p>{errMsg}</p>
      </div>
    </>
  );
};
export default Profile;
