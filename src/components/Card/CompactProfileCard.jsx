/* eslint-disable no-nested-ternary */
import React, { useRef, useState } from 'react';
import {
  motion,
  useAnimation,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion';
import { InformationCircleIcon, UsersIcon } from '@heroicons/react/solid';

import ImageCarousel from './ImageCarousel.jsx';

const CompactProfileCard = ({
  user,
  swipe,
  expandProfile,
  disabled,
  children,
}) => {
  console.log(user, 'user');
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [dragDirection, setDragDirection] = useState();

  const animation = useAnimation();
  const x = useMotionValue(0);
  const cardEl = useRef();

  const randomDegree = [0, 6][Math.floor(Math.random() * 2)];

  const getDirection = () => {
    const dragX = x.get();
    return dragX >= 1 ? 'right' : dragX <= -1 ? 'left' : undefined;
  };

  const handleDragEnd = () => {
    // getting move magnitude
    const parentWidth = cardEl.current.parentNode.getBoundingClientRect().width;
    const elWidth = cardEl.current.getBoundingClientRect().width;
    const distance = parentWidth + elWidth / 2;
    const moveMagnitude = dragDirection === 'left' ? -distance : distance;

    if (dragDirection && Math.abs(x.get()) > elWidth / 1.25) {
      animation.start({
        x: moveMagnitude,
        transition: { duration: 0.4 },
      });
      const swipedRight = moveMagnitude >= 1;
      swipe(swipedRight, animation);
    } else {
      // reset rotation
      animation.start({ rotate: 0 });
    }
  };

  const handleDrag = () => {
    const direction = getDirection();
    if (direction !== dragDirection) {
      setDragDirection(direction);
      animation.start({ rotate: direction === 'right' ? 15 : -15 });
    }
  };

  const handleDragStart = () => {
    const direction = getDirection();
    setDragDirection(direction);
    animation.start({ rotate: direction === 'right' ? 15 : -15 });
  };

  const changePointer = () => setIsGrabbing(!isGrabbing);

  return (
    <motion.div
      className="absolute right-0 top-20 left-0 ml-auto mr-auto w-72 rounded-lg"
      animate={animation}
      dragConstraints={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      ref={cardEl}
      dragElastic={1}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      drag="x"
      style={{ x }}
    >
      <motion.div
        layoutId={`expandable-card-${user.id}`}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        // onClick={expandProfile}
      >
        <div
          className={`bg-slate-500  absolute min-w-full  min-h-full h-96 font-semibold flex flex-col justify-end  text-center rounded-md  max-w-xs shadow-lg ${
            isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          <motion.div
            className="h-full w-full"
            transition={{ delay: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ImageCarousel images={user.pictures} />
          </motion.div>
          {/* <div className="h-full w-full z-20 bg-slate-800 absolute opacity-40 " /> */}
          <div className="flex p-4 pb-2 z-30">
            {children}
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompactProfileCard;
