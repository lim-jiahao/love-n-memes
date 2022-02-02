import React from 'react';
import { motion } from 'framer-motion';

const ExpandedProfileCard = ({ collapseProfile, user, children }) =>
  // const backgroundStyle = {
  //   backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(35, 31, 32, 1)), url(${user.pictures.length > 0 ? user.pictures[0].filename : 'https://picsum.photos/seed/picsum/200/300'})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  // };
  (
    <motion.div
      layoutId={`expandable-card-${user.id}`}
      transition={{ delay: 0.15, duration: 0.4 }}
      animate={{ opacity: 1 }}
      className="absolute right-0 top-20 left-0 ml-auto mr-auto w-80 lg:w-3/4 md:w-full lg:mx-auto  "
    >
      <motion.div
        className="bg-sky-500 absolute min-w-full rounded-3xl  min-h-full h-96 font-semibold flex flex-col justify-start  text-center  max-w-xs shadow-lg"
        animate={{ borderRadius: '1.5rem' }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="md:flex h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
export default ExpandedProfileCard;
