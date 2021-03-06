import React from 'react';
import { motion } from 'framer-motion';
import { LocationMarkerIcon, BriefcaseIcon, PencilIcon } from '@heroicons/react/outline';

const CardContent = ({ user, disabled, expanded }) => (
  <motion.div
    layoutId={`card-content-${user.id}`}
  >
    <div className="text-slate-50 text-left">
      <div className="mb-1">

        <h1 className="text-4xl inline-block font-bold tracking-wider">
          {user.name.split(' ')[0]}
        </h1>
        <p className="inline-block ml-4  font-light text-3xl">{user.age}</p>
        {expanded && (
          <div className="inline-block ml-4">
            {user.gender === 'female' ? (
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="venus" className="svg-inline--fa fa-venus fa-w-9 h-6 w-6 text-white" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512"><path fill="currentColor" d="M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V368H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80z" /></svg>
            ) : (
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mars" className="svg-inline--fa fa-mars fa-w-12 h-6 w-6 text-white -rotate-45" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M372 64h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7c-22.2-14-48.5-22.1-76.7-22.1C64.5 160 0 224.5 0 304s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V76c0-6.6-5.4-12-12-12zM144 384c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" /></svg>
            )}
          </div>
        )}

      </div>
      <div className="flex items-center mb-1">
        <BriefcaseIcon className="h-4 w-4 mr-2" />
        <p className="font-light text-sm">{user.occupation}</p>
      </div>
      <div className="flex items-center mb-1">
        <LocationMarkerIcon className="h-4 w-4 mr-2" />
        <p className="font-light text-sm">{user.location}</p>
      </div>
      {expanded && (
        <>
          <motion.div className="flex mb-1">
            <PencilIcon className="h-4 w-4 mr-2" />
            <p className="font-light text-sm">{user.bio}</p>
          </motion.div>

          <div className="mb-2 mt-4">
            <div className="mr-2">
              Looking for:
            </div>
            {user.purposes.map((el) => (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                { el.name }
              </span>
            ))}
          </div>
          <div className="mb-2">
            <div className="mr-2">
              Interested in:
            </div>
            {user.interests.map((el) => (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                { el.name }
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  </motion.div>
);

export default CardContent;
