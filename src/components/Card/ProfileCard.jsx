import React, { useState } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';

import { InformationCircleIcon } from '@heroicons/react/solid';
import CompactProfileCard from './CompactProfileCard.jsx';
import ExpandedProfileCard from './ExpandedProfileCard.jsx';
import CardContent from './CardContent.jsx';
import ImageCarousel from './ImageCarousel.jsx';

const ProfileCard = ({
  swipe, user, disabled, onCollapse, onExpand,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

  const collapseProfile = () => {
    setIsExpanded(false);
    onCollapse();
  };

  const expandProfile = () => {
    setIsExpanded(true);
    onExpand();
  };

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <AnimateSharedLayout>
      {isExpanded ? (
        <ExpandedProfileCard collapseProfile={collapseProfile} user={user}>
          <div className="md:flex w-full">
            <div className="md:grow md:w-full md:order-1">
              <ImageCarousel
                images={user.pictures}
                expanded={isExpanded}
                paginate={paginate}
                page={page}
                direction={direction}
              />
            </div>
            <motion.div className="p-4 md:w-1/2" onClick={collapseProfile}>
              <CardContent user={user} disabled={disabled} expanded={isExpanded} />
            </motion.div>
          </div>
        </ExpandedProfileCard>
      ) : (
        <CompactProfileCard
          user={user}
          swipe={swipe}
          expandProfile={expandProfile}
          disabled={disabled}
        >
          <motion.div className="h-full w-full ">
            <ImageCarousel
              images={user.pictures}
              expanded={isExpanded}
              paginate={paginate}
              page={page}
              direction={direction}
            />
          </motion.div>
          <div className="flex p-4 pb-4 absolute w-full">
            <CardContent user={user} disabled={disabled} expanded={isExpanded} />
            <div className="flex flex-col justify-between items-end grow">
              <div className="mt-3">

                {user.gender === 'female' ? (
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="venus" className="svg-inline--fa fa-venus fa-w-9 h-6 w-6 text-pink-200" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512"><path fill="currentColor" d="M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V368H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80z" /></svg>
                ) : (
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mars" className="svg-inline--fa fa-mars fa-w-12 h-6 w-6 text-sky-300 -rotate-45" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M372 64h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7c-22.2-14-48.5-22.1-76.7-22.1C64.5 160 0 224.5 0 304s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V76c0-6.6-5.4-12-12-12zM144 384c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" /></svg>
                )}

              </div>
              <motion.div
                transition={{ delay: 0.2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <InformationCircleIcon
                  onClick={disabled ? undefined : expandProfile}
                  className="h-4 w-4 text-white"
                />
              </motion.div>
            </div>
          </div>

        </CompactProfileCard>
      )}
    </AnimateSharedLayout>
  );
};

export default ProfileCard;
