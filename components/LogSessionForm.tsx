import React, { useState } from 'react';

interface LogSessionFormProps {
  onAddSession: (duration: number, notes: string) => void;
}

const LogSessionForm: React.FC<LogSessionFormProps> = ({ onAddSession }) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [notes, setNotes] =useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);
    if (totalMinutes > 0) {
      onAddSession(totalMinutes, notes);
      setHours('');
      setMinutes('');
      setNotes('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-slate-300 mb-1">시간</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="0"
            min="0"
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label htmlFor="minutes" className="block text-sm font-medium text-slate-300 mb-1">분</label>
          <input
            type="number"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="30"
            min="0"
            max="59"
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>
       <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-1">메모 (선택 사항)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="예: 스케일 및 코드 연습"
            rows={3}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      <button 
        type="submit"
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        세션 기록
      </button>
    </form>
  );
};

export default LogSessionForm;