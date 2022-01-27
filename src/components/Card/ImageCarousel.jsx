import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
  }),
  center: {
    x: 0,
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
  }),
};

const ImageCarousel = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const backgroundStyle = {
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(35, 31, 32, 1)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div className="overflow-hidden h-full w-full absolute  z-10">
      {images.length > 0 && (
        <AnimatePresence initial={false}>
          <motion.img
            key={page}
            src={images[imageIndex].filename}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'tween' },
              opacity: { duration: 0.1 },
            }}
            className="h-full w-full absolute rounded-md"
          />
          <div className="h-full w-full z-20  absolute rounded-lg" style={backgroundStyle} />
        </AnimatePresence>
      )}
      <div
        className="h-full w-10 absolute right-0 top-0 z-50"
        onClick={() => paginate(1)}
      />
      <div
        className="h-full w-10  absolute left-0 top-0 z-50"
        onClick={() => paginate(-1)}
      />
    </div>
  );
};

export default ImageCarousel;
