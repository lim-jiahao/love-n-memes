import React from 'react';
import { motion } from 'framer-motion';
import { LocationMarkerIcon, BriefcaseIcon } from '@heroicons/react/outline';

const CardContent = ({ user, disabled }) => (
  <motion.div
    layoutId={`card-content-${user.id}`}
    style={{ opacity: disabled ? 0.2 : 1 }}
  >
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
  </motion.div>
);

export default CardContent;
