import React from 'react';
import {
  motion, AnimatePresence, useTransform, useMotionValue,
} from 'framer-motion';

const MatchAnimation = ({ handleClick, match }) => {
  const x = useMotionValue();
  const enterAnimation = {
    opacity: 1,
    rotate: 360,
    scale: 2,
    borderRadius: '5px',
  };

  const exitAnimation = {
    opacity: 0,
    rotate: 180,
  };

  const hoverAnimation = {
    borderRadius: '50%',
  };

  return (
    <AnimatePresence>
      {match && (
        <motion.div
          key="match-modal"
          className="h-40 w-40 absolute left-0 right-0 mr-auto ml-auto rounded bg-slate-500"
          animate={enterAnimation}
          whileHover={hoverAnimation}
          exit={exitAnimation}
          transition={{
            duration: 0.75,
          }}
          initial={{ opacity: 1, scale: 0.5, borderRadius: '50%' }}
        />
      )}
    </AnimatePresence>
  );
};

export default MatchAnimation;
