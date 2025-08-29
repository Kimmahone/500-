import React from 'react';
import { MILESTONES } from '../constants';

interface MilestoneTrackerProps {
  totalHours: number;
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ totalHours }) => {
  return (
    <div className="space-y-4">
      {MILESTONES.map(milestone => {
        const isAchieved = totalHours >= milestone.hours;
        return (
          <div key={milestone.level} className={`p-3 rounded-lg border-l-4 transition-all duration-500 ${isAchieved ? 'border-cyan-400 bg-slate-700/50' : 'border-slate-600 bg-slate-800/50'}`}>
            <div className="flex items-center justify-between">
              <h3 className={`font-bold ${isAchieved ? 'text-cyan-300' : 'text-slate-400'}`}>{milestone.level}</h3>
              <span className={`text-sm font-mono ${isAchieved ? 'text-cyan-400' : 'text-slate-500'}`}>{milestone.hours.toLocaleString()} 시간</span>
            </div>
            <p className={`text-sm mt-1 ${isAchieved ? 'text-slate-300' : 'text-slate-500'}`}>{milestone.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MilestoneTracker;