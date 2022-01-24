import React, { useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const Profilecard = ({ drag }) => {
  const randomDegree = [0, 6][Math.floor(Math.random() * 2)];

  const cardElem = useRef(null);

  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);

  const [direction, setDirection] = useState();

  const [velocity, setVelocity] = useState();

  // const getVote = (childNode, parentNode) => {
  //   const childRect = childNode.getBoundingClientRect();
  //   const parentRect = parentNode.getBoundingClientRect();
  //   const result = parentRect.left >= childRect.right
  //     ? false
  //     : parentRect.right <= childRect.left
  //       ? true
  //       : undefined;
  //   return result;
  // };

  // determine direction of swipe based on velocity
  const getDirection = () => (velocity >= 1 ? 'right' : velocity <= -1 ? 'left' : undefined);

  const getTrajectory = () => {
    setVelocity(x.get());
    setDirection(getDirection());
  };

  const flyAway = (min) => {
    const flyAwayDistance = (direction) => {
      const parentWidth = cardElem.current.parentNode.getBoundingClientRect()
        .width;
      const childWidth = cardElem.current.getBoundingClientRect().width;
      console.log(parentWidth, 'parentwidth');
      console.log(childWidth, 'child width');
      return direction === 'left'
        ? -parentWidth - childWidth / 2
        : parentWidth + childWidth / 2;
    };

    if (direction && Math.abs(velocity) > min) {
      setConstrained(false);
      controls.start({
        x: flyAwayDistance(direction),
      });
    }
  };

  return (
    <motion.div
      className="absolute ml-auto mr-auto w-80 left-0 right-0 "
      animate={controls}
      drag
      dragConstraints={constrained && {
        left: 0, right: 0, top: 0, bottom: 0,
      }}
      dragElastic={1}
      ref={cardElem}
      style={{ x }}
      onDrag={getTrajectory}
      onDragEnd={() => flyAway(500)}
      whileTap={{ scale: 1.1 }}
    >
      <div className={`bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs rotate-${randomDegree}`}>
        <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="product designer" />
        <h1 className="text-lg text-gray-700"> John Doe </h1>
        <h3 className="text-sm text-gray-400 "> Creative Director </h3>
        <p className="text-xs text-gray-400 mt-4"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        <button type="button" className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">Hire Me</button>
      </div>
    </motion.div>
  );
};

export default Profilecard;
