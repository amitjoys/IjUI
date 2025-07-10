import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const AnimatedSearchIcon = ({ onClick, isDarkMode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full cursor-pointer ${
        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Search size={20} />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedSearchIcon;