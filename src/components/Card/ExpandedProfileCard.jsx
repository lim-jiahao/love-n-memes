import React from 'react';
import { motion } from 'framer-motion';

const ExpandedProfileCard = ({ collapseProfile, user, children }) => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(35, 31, 32, 1)), url(${user.pictures.length > 0 ? user.pictures[0].filename : 'https://picsum.photos/seed/picsum/200/300'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };
  return (
    <motion.div
      layoutId={`expandable-card-${user.id}`}
      transition={{ delay: 0.15, duration: 0.4 }}
      animate={{ opacity: 1 }}
      onClick={collapseProfile}
      className="absolute right-0 top-20 left-0 ml-auto mr-auto w-full "
    >
      <div
        className="bg-slate-500 absolute min-w-full  min-h-full h-96 font-semibold flex flex-col justify-start  text-center rounded-3xl px-4 py-6 max-w-xs shadow-lg"
        style={backgroundStyle}
      >
        <motion.div
          className="flex"
        >
          {children}
          <motion.div transition={{ delay: 0.4 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            {user.bio}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default ExpandedProfileCard;
