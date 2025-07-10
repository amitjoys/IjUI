import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ResultsTableFooter = ({ isDarkMode, currentPage, totalPages, onPageChange }) => (
  <div className={`flex justify-between items-center p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
    <span>{`${(currentPage - 1) * 25 + 1} - ${Math.min(currentPage * 25, totalPages * 25)} of ${totalPages * 25}`}</span>
    <div className="flex items-center space-x-2">
      <button 
        className={`p-1 border rounded ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </button>
      <span>{currentPage}</span>
      <button 
        className={`p-1 border rounded ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

export default ResultsTableFooter;