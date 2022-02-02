/* eslint-disable no-nested-ternary */
import React, { useRef, useState } from 'react';
import {
  motion,
  useAnimation,
  useMotionValue,
} from 'framer-motion';

const CompactProfileCard = ({
  user,
  swipe,
  expandProfile,
  disabled,
  children,
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
    const parentWidth = cardEl.current.parentNode.parentNode.getBoundingClientRect().width;
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
      className="absolute right-0 top-20 left-0 ml-auto mr-auto w-72"
      layoutId={`expandable-card-${user.id}`}
      animate={{ opacity: 1, borderRadius: '1.5rem' }}
      transition={{ duration: 0.2, delay: 0.2 }}
      initial={{ opacity: 0.1, borderRadius: '1.5rem' }}
    >
      <motion.div
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
          className={`bg-sky-900  absolute min-w-full rounded-3xl  min-h-full h-96 font-semibold flex flex-col justify-end  text-center max-w-xs shadow-lg ${
            isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CompactProfileCard;
