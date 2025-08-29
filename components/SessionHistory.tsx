import React from 'react';
import { Session } from '../types';

interface SessionHistoryProps {
  sessions: Session[];
  onDeleteSession: (sessionId: string) => void;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ sessions, onDeleteSession }) => {
  if (sessions.length === 0) {
    return <p className="text-slate-400 italic">아직 기록된 세션이 없습니다. 연습을 시작할 시간입니다!</p>;
  }

  const formatDuration = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    let result = '';
    if (h > 0) result += `${h}시간 `;
    if (m > 0) result += `${m}분`;
    return result.trim();
  };

  return (
    <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
      {[...sessions].reverse().map(session => (
        <div key={session.id} className="bg-slate-700/50 p-3 rounded-lg flex items-center justify-between transition-all hover:bg-slate-700">
          <div>
            <p className="font-semibold text-slate-200">
              {session.date} - <span className="text-cyan-400">{formatDuration(session.duration)}</span>
            </p>
            <p className="text-sm text-slate-400">{session.notes || " "}</p>
          </div>
          <button 
            onClick={() => onDeleteSession(session.id)}
            className="text-slate-500 hover:text-red-500 transition-colors p-1"
            aria-label="세션 삭제"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SessionHistory;