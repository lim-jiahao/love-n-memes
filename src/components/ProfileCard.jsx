/* eslint-disable no-nested-ternary */
import React, { useRef, useState } from 'react';
import {
  motion, useAnimation, useMotionValue,
} from 'framer-motion';

const Profilecard = ({ user, swipe, isTop }) => {
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

    // reset rotation
    animation.start({ rotate: 0 });
    if (dragDirection && Math.abs(x.get()) > elWidth / 2) {
      animation.start({ x: moveMagnitude, transition: { duration: 0.4 } });
      const swipedRight = moveMagnitude >= 1;
      swipe(swipedRight);
      setTimeout(() => cardEl.current.remove(), 400);
    }
  };

  const handleDrag = () => {
    const direction = getDirection();
    setDragDirection(direction);
    animation.start({ rotate: direction === 'right' ? 15 : -15 });
  };

  const changePointer = () => setIsGrabbing(!isGrabbing);

  return (
    <motion.div
      ref={cardEl}
      className={`absolute ml-auto mr-auto w-80 left-0 right-0 rotate-6 ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={changePointer}
      onMouseUp={changePointer}
      animate={animation}
      dragConstraints={{
        left: 0, right: 0, top: 0, bottom: 0,
      }}
      dragElastic={1}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      drag="x"
      style={{ x }}
    >
      <div className={`bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs rotate-${randomDegree}`}>
        <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="product designer" />
        <h1 className="text-lg text-gray-700">
          {user.name}
        </h1>
        <h3 className="text-sm text-gray-400 "> Creative Director </h3>
        <p className="text-xs text-gray-400 mt-4"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        <button type="button" className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">Hire Me</button>
      </div>
    </motion.div>
  );
};

export default Profilecard;
