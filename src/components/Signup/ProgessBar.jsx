import React from 'react';

const ProgessBar = ({ step }) => (
  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-2">
    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${(100 / 3) * step}%` }}>
      Step
      {' '}
      {step}
      {' '}
      of 3
    </div>
  </div>
);

export default ProgessBar;
