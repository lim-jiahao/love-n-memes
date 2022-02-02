import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/outline';
import MemeUploadForm from './MemeUploadForm.jsx';

const MemeUpload = () => {
  const [memes, setMemes] = useState([]);

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
        <MemeUploadForm memes={memes} setMemes={setMemes} />
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
