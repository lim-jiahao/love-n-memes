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
  const [isExpanded, setIsExpanded] = useState(true);

  const collapseProfile = () => {
    setIsExpanded(false);
    onCollapse();
  };

  const expandProfile = () => {
    setIsExpanded(true);
    onExpand();
  };
  return (
    <AnimateSharedLayout>
      {isExpanded ? (
        <ExpandedProfileCard collapseProfile={collapseProfile} user={user}>
          <div className="grid grid-cols-5">
            <div className="col-span-2 z-20">
              <CardContent user={user} disabled={disabled} />
            </div>
            <div className="col-span-3 z-10">
              <ImageCarousel images={user.pictures} expanded={isExpanded} />
            </div>
          </div>
        </ExpandedProfileCard>
      ) : (
        <CompactProfileCard
          user={user}
          swipe={swipe}
          expandProfile={expandProfile}
          disabled={disabled}
        >
          <motion.div
            className="h-full w-full"
          >
            <ImageCarousel images={user.pictures} expanded={isExpanded} />
          </motion.div>
          <div className="flex p-4 pb-4 z-30">
            <CardContent user={user} disabled={disabled} />
            <div className="flex justify-end items-end grow">
              <motion.div
                transition={{ delay: 0.45 }}
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
