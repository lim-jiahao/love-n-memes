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
    const totalPictures = user.pictures.length;
    let currentPictureIndex = Math.abs(page + newDirection);
    console.log(currentPictureIndex);
    currentPictureIndex = (currentPictureIndex >= totalPictures) ? 0 : currentPictureIndex;
    setPage([currentPictureIndex, newDirection]);
  };

  return (
    <AnimateSharedLayout>
      {isExpanded ? (
        <ExpandedProfileCard collapseProfile={collapseProfile} user={user}>
          <div className="flex w-full">
            <div className="grow w-full order-1">
              <ImageCarousel
                images={user.pictures}
                expanded={isExpanded}
                paginate={paginate}
                page={page}
                direction={direction}
              />
            </div>
            <motion.div className=" p-4 w-1/2" onClick={collapseProfile}>
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
            <div className="flex justify-end items-end grow">
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
