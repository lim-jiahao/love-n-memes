import {
  motion, AnimatePresence,
} from 'framer-motion';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';
import React, { Fragment, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationIcon, XIcon } from '@heroicons/react/outline';

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
  },
  exit: {
    x: -1000,
    transition: {
      duration: 0.5,
    },
  },
};
const textVariants = {
  enter: {
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  rest: {
    x: 1000,
  },
  exit: {
    x: 1000,
    transition: {
      duration: 0.5,
    },
  },
};

const pepeImages = ['pepe-laugh.gif', 'pepe-nodding.gif'];

const confettiOptions = {
  force: 0.4,
  duration: 3000,
  particleCount: 100,
  floorHeight: window.innerHeight,
  floorWidth: window.innerWidth,
};

const MatchAnimation = ({ match, user, setMatch }) => {
  const navigate = useNavigate();

  const randomPepe = pepeImages[Math.floor(Math.random() * pepeImages.length)];

  return (
    <AnimatePresence>
      {match && (
      <div
        key="match-modal"
        className="absolute rounded left-0 right-0 mx-auto w-96 top-20"
      >
        <div className="flex justify-center items-center">
          <div className="absolute w-96  mr-auto ml-auto left-60">
            <ConfettiExplosion {...confettiOptions} />
          </div>

          <motion.img
            src={randomPepe}
            alt="pepe laugh"
            className="rounded-l-3xl h-80 w-80 m-auto"
            animate="enter"
            exit="exit"
            initial="rest"
            variants={pepeVariants}
          />

          <motion.div
            animate="enter"
            exit="exit"
            initial="rest"
            variants={textVariants}
          >
            <div className=" bg-white rounded-r-3xl px-4 pt-5 pb-4 text-left  shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 h-80 w-80 relative flex flex-col text-center">
              <div className="sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setMatch(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="text-center mb-4">
                <h2 className="text-6xl">
                  It&apos;s a
                  {' '}
                  <span className="text-indigo-500">Match!</span>
                </h2>
              </div>
              <p>
                Send
                {' '}
                {user.name}
                some of your best of dank memes
              </p>
              <div className="self-end justify-self-end mt-8">
                <button className=" items-center w-48 bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-3xl" onClick={() => navigate('/chats')} type="button">
                  View your matches
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      )}
    </AnimatePresence>
  );
};

export default MatchAnimation;
