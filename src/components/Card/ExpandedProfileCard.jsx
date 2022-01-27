import React from 'react';
import { motion } from 'framer-motion';

const ExpandedProfileCard = ({ onCollapse, user }) => (
  <motion.div
    layoutId="expandable-card"
    transition={{ duration: 0.4 }}
    initial={{ scale: 1 }}
    animate={{ opacity: 1 }}
    onClick={onCollapse}
  >
    <div className="h-96 w-96 bg-slate-800">
      this is a test
    </div>
  </motion.div>
);

export default ExpandedProfileCard;
