import React, { useEffect } from 'react';
import {
  motion, AnimatePresence, useTransform, useMotionValue,
} from 'framer-motion';

const MatchAnimation = ({ handleClick, match }) => {
  const x = useMotionValue();

  const enterAnimation = {
    opacity: 1,
    scale: 1,
    borderRadius: '5px',
    rotate: 360,
    transition: {
      duration: 1,
    },
  };

  const exitAnimation = {
    opacity: 0,
    rotate: 360,
  };

  const hoverAnimation = {
    borderRadius: '50%',
  };

  return (
    <AnimatePresence>
      {match && (
        <motion.div
          key="match-modal"
          className="w-96 rounded text-center top-40  absolute right-0 left-0 mr-auto ml-auto text-9xl"
          animate={enterAnimation}
          whileHover={hoverAnimation}
          exit={exitAnimation}
          transition={{
            duration: 0.75,
          }}
          initial={{ opacity: 1, scale: 0.1, borderRadius: '50%' }}
        >
          😂
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatchAnimation;
