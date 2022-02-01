import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';

const variants = {
  enter: () => ({
    opacity: 0,
  }),
  center: {
    x: 0,
    zIndex: 0,
    opacity: 1,
  },
  exit: () => ({
    zIndex: 0,
    opacity: 0,
  }),
};

const ImageCarousel = ({
  images, expanded, paginate, page,
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

  // this component could use some refactoring, many of the styles are similar other than
  // some position: absolutes here and there.
  return (
    <>
      {expanded ? (
        <motion.div
          className="overflow-hidden bg-white rounded-r-3xl h-full w-full flex justify-center items-center relative"
          layoutId="image-carousel"
          transition={{ delay: 0.15, duration: 0.4 }}
        >

          <AnimatePresence initial={false}>
            <motion.img
              key={page}
              src={images.length > 0 ? images[imageIndex].filename : 'default.jpg'}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full w-full rounded-r-3xl absolute"
              transition={{
                opacity: { duration: 0.1 },
              }}
            />
          </AnimatePresence>
          <div className="absolute w-full flex mt-2 px-4 py-1 top-0">
            {images.map((_, index) => {
              const width = 100 / images.length;

              const divStyle = 'h-1 mx-2 rounded-3xl ';
              const selected = 'bg-white';
              const unselected = 'opacity-50 bg-slate-900';
              return (
                <div className={`${divStyle} ${index === imageIndex ? selected : unselected}`} style={{ width: `${width}%` }} />
              );
            })}
          </div>
          <div
            className="h-full w-10 absolute right-0 top-0   opacity-50 hover:bg-gradient-to-r hover:from-transparent hover:to-black"
            onClick={() => paginate(1)}
          />
          <div
            className="h-full w-10  absolute left-0 top-0 opacity-50   hover:bg-gradient-to-l hover:from-transparent hover:to-black"
            onClick={() => paginate(-1)}
          />
        </motion.div>
      ) : (
        <motion.div
          className="overflow-hidden h-full w-full relative"
          layoutId="image-carousel"
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={page}
              src={images.length > 0 ? images[imageIndex].filename : 'default.jpg'}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
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

          <div className="absolute w-full flex mt-2 px-4 py-1">
            {images.map((_, index) => {
              const width = 100 / images.length;

              const divStyle = 'h-1 mx-2 rounded-3xl ';
              const selected = 'bg-white';
              const unselected = 'opacity-50 bg-slate-900';
              return (
                <div className={`${divStyle} ${index === imageIndex ? selected : unselected}`} style={{ width: `${width}%` }} />
              );
            })}
          </div>

          <div
            className="h-full w-10 absolute right-0 top-0  rounded-r-3xl opacity-50 hover:bg-gradient-to-r hover:from-transparent hover:to-black"
            onClick={() => paginate(1)}
          />
          <div
            className="h-full w-10  absolute left-0 top-0 rounded-l-3xl opacity-50  hover:bg-gradient-to-l hover:from-transparent hover:to-black"
            onClick={() => paginate(-1)}
          />
        </motion.div>
      )}
    </>
  );
};

export default ImageCarousel;
