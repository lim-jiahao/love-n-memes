/* eslint-disable no-nested-ternary */
import React, { useRef, useState } from 'react';
import {
  motion, useAnimation, useMotionValue, AnimatePresence,
} from 'framer-motion';
import { LocationMarkerIcon, BriefcaseIcon } from '@heroicons/react/outline';
import { InformationCircleIcon } from '@heroicons/react/solid';

const pics = [
  'https://picsum.photos/id/1/200/300',
  'https://picsum.photos/id/2/200/300',
  'https://picsum.photos/id/3/200/300',
];

const Profilecard = ({
  user, swipe,
}) => {
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
    const moveMagnitude = dragDirection === 'left'
      ? -(distance)
      : distance;

    if (dragDirection && Math.abs(x.get()) > elWidth / 1.25) {
      animation.start({
        x: moveMagnitude,
        transition: { duration: 0.4 },
      });
      const swipedRight = moveMagnitude >= 1;
      swipe(swipedRight, animation);
      setTimeout(() => cardEl.current.remove(), 400);
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

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(35, 31, 32, 1)), url(${user.pictures.length > 0 ? user.pictures[0].filename : 'https://picsum.photos/seed/picsum/200/300'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <motion.div
      className="absolute right-0 top-20 left-0 ml-auto mr-auto w-72 "
      animate={animation}
      dragConstraints={{
        left: 0, right: 0, top: 0, bottom: 0,
      }}
      ref={cardEl}
      dragElastic={1}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      drag="x"
      style={{ x }}
    >
      <div
        className={`bg-black absolute min-w-full  min-h-full h-96 font-semibold flex flex-col justify-end  text-center rounded-3xl px-4 py-6 max-w-xs shadow-lg ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={backgroundStyle}
      >
        {/* <img className="mb-3 w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/seed/picsum/200/300" alt="product designer" /> */}
        <div className="text-slate-50 text-left">
          <div className="mb-1">
            <h1 className="text-4xl inline-block font-bold tracking-wider">
              {user.name.split(' ')[0]}
            </h1>
            <p className="inline-block ml-4 font-light text-3xl">{user.age}</p>
          </div>
          <div className="flex items-center">
            <BriefcaseIcon className="h-4 w-4 mr-2" />
            <p className="font-light text-sm">{user.occupation}</p>
          </div>
          <div className="flex items-center">
            <LocationMarkerIcon className="h-4 w-4 mr-2" />
            <p className="font-light text-sm">{user.location}</p>
          </div>
        </div>
      </div>
    </motion.div>

  );
};

export default Profilecard;
