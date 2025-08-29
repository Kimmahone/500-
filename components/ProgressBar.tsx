import React from 'react';

interface ProgressBarProps {
  currentValue: number;
  maxValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentValue, maxValue }) => {
  const percentage = Math.min((currentValue / maxValue) * 100, 100);

  return (
    <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden border-2 border-slate-600">
      <div
        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center text-sm font-bold text-white"
        style={{ width: `${percentage}%` }}
      >
        {percentage > 10 && `${percentage.toFixed(2)}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
