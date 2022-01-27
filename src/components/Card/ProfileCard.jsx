import React, { useState } from 'react';
import { AnimateSharedLayout } from 'framer-motion';

import CompactProfileCard from './CompactProfileCard.jsx';
import ExpandedProfileCard from './ExpandedProfileCard.jsx';

const ProfileCard = ({
  swipe, user, disabled, onCollapse, onExpand,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <ExpandedProfileCard onCollapse={collapseProfile} user={user} />
      ) : (
        <CompactProfileCard
          user={user}
          swipe={swipe}
          expandProfile={expandProfile}
          disabled={disabled}
        />
      )}
    </AnimateSharedLayout>
  );
};

export default ProfileCard;
