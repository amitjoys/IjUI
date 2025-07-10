
import React from 'react';

const Footer = ({ isDarkMode }) => (
  <footer className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border-t border-gray-200 p-4 text-center`}>
    © 2024 InfoJoy. All rights reserved.
  </footer>
);

export default Footer;
