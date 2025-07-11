import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnimatedSearchIconProps {
  onClick: () => void;
  isDarkMode: boolean;
}

const AnimatedSearchIcon: React.FC<AnimatedSearchIconProps> = ({ onClick, isDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        isDarkMode 
          ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'
      }`}
    >
      <Search size={20} />
    </motion.button>
  );
};

export default AnimatedSearchIcon;