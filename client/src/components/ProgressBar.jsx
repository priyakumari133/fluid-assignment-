import React from 'react';

function ProgressBar({ completed, total, progress }) {
  return (
    <div className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Progress</h3>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {progress}%
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Stats */}
      <div className="flex gap-4 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span><strong>{completed}</strong> completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <span><strong>{total - completed}</strong> remaining</span>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
