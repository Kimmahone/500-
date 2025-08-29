import React, { useState } from 'react';

interface SkillSetterProps {
  onSkillSet: (skill: string) => void;
}

const SkillSetter: React.FC<SkillSetterProps> = ({ onSkillSet }) => {
  const [skill, setSkill] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skill.trim()) {
      onSkillSet(skill);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          달인 퀘스트
        </h1>
        <p className="text-slate-400 text-center mb-6">
          500시간의 여정을 시작하세요.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="skill" className="block text-lg font-medium text-slate-300 mb-2">
              어떤 기술을 정복하시겠습니까?
            </label>
            <input
              type="text"
              id="skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="예: 피아노 연주"
              className="w-full bg-slate-700 border border-slate-600 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!skill.trim()}
          >
            여정 시작
          </button>
        </form>
      </div>
    </div>
  );
};

export default SkillSetter;