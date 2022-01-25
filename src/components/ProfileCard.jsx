import React, { useRef, useState, useEffect } from 'react';
import {
  motion, useAnimation, useMotionValue, useTransform,
} from 'framer-motion';

const Profilecard = ({ ...props }) => {
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [startPosition, setStartPosition] = useState();
  const [velocity, setVelocity] = useState();

  const randomDegree = [0, 6][Math.floor(Math.random() * 2)];

  const animation = useAnimation();

  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 150], [-20, 20]);
  function handleDragEnd(event) {
    const dragX = x.get();

    // reset rotation
    animation.start({ rotate: 0 });
    if (dragX <= -1) {
      animation.start({ x: -500, transition: { duration: 0.2 } });
      console.log('animating?');
    }

    // If dragged past a certain point to the left, stop tracking the x and y positions
    // Animate the card to fly to the left
    else if (dragX >= 1) {
      animation.start({ x: 500, transition: { duration: 0.2 } });
    }
  }

  const handleDrag = (event, info) => {
    const dragX = x.get();
    console.log(dragX, 'drag x');
    if (dragX > 1) {
      animation.start({ rotate: 15 });
    } else if (dragX < -1) {
      animation.start({ rotate: -15 });
    }
  };

  const changePointer = () => {
    setIsGrabbing(!isGrabbing);
  };

  return (
    <motion.div
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
        <h1 className="text-lg text-gray-700"> John Doe </h1>
        <h3 className="text-sm text-gray-400 "> Creative Director </h3>
        <p className="text-xs text-gray-400 mt-4"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        <button type="button" className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">Hire Me</button>
      </div>
    </motion.div>
  );
};

export default Profilecard;
