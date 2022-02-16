import React, { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

const Success = ({ setAuth }) => {
  const [num, setNum] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setNum(num - 1);
      if (num === 0) {
        setAuth(true);
        navigate('/');
      }
    }, 1000);
  }, [num]);

  return (
    <>
      <div className="flex justify-center items-center">
        <CheckCircleIcon className="h-16 w-16 text-green-600" />
        <p className="font-bold text-lg">Success!</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm mb-3">Tip: upload your dank memes at the profile page!</p>
        <p className="text-sm">
          Navigating to home page in
          {' '}
          {num}
          {' '}
          seconds...
        </p>
      </div>
    </>
  );
};
export default Success;
