import React, { useState } from 'react';
import { AnimateSharedLayout } from 'framer-motion';

import CompactProfileCard from './CompactProfileCard.jsx';
import ExpandedProfileCard from './ExpandedProfileCard.jsx';
import CardContent from './CardContent.jsx';

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
        <ExpandedProfileCard onCollapse={collapseProfile} user={user}>
          <CardContent user={user} disabled={disabled} />
        </ExpandedProfileCard>
      ) : (
        <CompactProfileCard
          user={user}
          swipe={swipe}
          expandProfile={expandProfile}
          disabled={disabled}
        >
          <CardContent user={user} disabled={disabled} />
        </CompactProfileCard>
      )}
    </AnimateSharedLayout>
  );
};

export default ProfileCard;
