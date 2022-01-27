import React from 'react';
import { motion } from 'framer-motion';

const CardContent = ({ user, disabled }) => (
  <motion.div>
    <div className="flex">
      <div className="text-slate-50 text-left">
        <div className="mb-1">
          <h1 className="text-4xl inline-block font-bold tracking-wider">
            {user.name.split(' ')[0]}
          </h1>
          <p className="inline-block ml-4 font-light text-3xl">{user.age}</p>
        </div>
        <div className="flex items-center">
          <BriefcaseIcon className="h-4 w-4 mr-2" />
          <p className="font-light text-sm">{user.occupation}</p>
        </div>
        <div className="flex items-center">
          <LocationMarkerIcon className="h-4 w-4 mr-2" />
          <p className="font-light text-sm">{user.location}</p>
        </div>
      </div>
      <div className="flex justify-end items-end grow">
        <div>
          <InformationCircleIcon onClick={disabled ? undefined : expandProfile} className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  </motion.div>
);

export default CardContent;
