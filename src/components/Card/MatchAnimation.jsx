import React, { useEffect } from 'react';
import {
  motion, AnimatePresence,
} from 'framer-motion';

const MatchAnimation = ({ handleClick, match }) => {
  const pepeVariants = {
    enter: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    rest: {
      x: -1000,
      y: -200,
    },
    exit: {
      x: -1000,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {match && (
        <motion.div
          key="match-modal"
          className="w-96 rounded text-center top-40  absolute right-0 left-0 mr-auto ml-auto text-9xl"
        >
          <motion.img
            src="pepe-laugh.gif"
            alt="pepe laugh"
            className="rounded-3xl h-60 w-60"
            animate="enter"
            exit="exit"
            initial="rest"
            variants={pepeVariants}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatchAnimation;
