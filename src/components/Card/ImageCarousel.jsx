import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 2000 : -2000,
    opacity: 0,
  }),
  center: {
    x: 0,
    zIndex: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 2000 : -2000,
    zIndex: 0,
    opacity: 0,
  }),
};

const ImageCarousel = ({
  images, expanded, paginate, page, direction,
}) => {
  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const backgroundStyle = {
    backgroundImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(25, 22, 21, 0.1),  rgba(25, 22, 21, 0.2), rgba(35, 31, 32, 0.8)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <>
      {expanded ? (
        <motion.div
          className="overflow-hidden bg-white rounded-r-3xl h-full w-full flex justify-center items-center relative"
          layoutId="image-carousel"
          transition={{ delay: 0.15, duration: 0.4 }}
        >

          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={images.length > 0 ? images[imageIndex].filename : 'default.jpg'}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full w-full rounded-r-3xl static"
              transition={{
                x: { type: 'tween' },
                opacity: { duration: 0.1 },
              }}
            />
          </AnimatePresence>
          <div
            className="h-full w-10 absolute right-0 top-0"
            onClick={() => paginate(1)}
          />
          <div
            className="h-full w-10  absolute left-0 top-0"
            onClick={() => paginate(-1)}
          />
        </motion.div>
      ) : (
        <motion.div
          className="overflow-hidden h-full w-full relative"
          layoutId="image-carousel"
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={images.length > 0 ? images[imageIndex].filename : 'default.jpg'}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'tween' },
                opacity: { duration: 0.1 },
              }}
              className="h-full w-full absolute rounded-3xl"
            />
            <motion.div
              id="image-overlay"
              className="h-full w-full absolute rounded-3xl"
              style={backgroundStyle}
            />
          </AnimatePresence>
          <div
            className="h-full w-10 absolute right-0 top-0"
            onClick={() => paginate(1)}
          />
          <div
            className="h-full w-10  absolute left-0 top-0"
            onClick={() => paginate(-1)}
          />
        </motion.div>
      )}
    </>
  );
};

export default ImageCarousel;
