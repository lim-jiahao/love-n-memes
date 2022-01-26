import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const TestAnimation = ({ controls }) => (
  <motion.div className="h-40 w-40 bg-slate-500" animate={controls} />
);

export default TestAnimation;
