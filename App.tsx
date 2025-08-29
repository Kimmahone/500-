import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Session } from './types';
import { TOTAL_HOURS_GOAL } from './constants';
import { getMotivation } from './services/geminiService';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import LogSessionForm from './components/LogSessionForm';
import SessionHistory from './components/SessionHistory';
import MilestoneTracker from './components/MilestoneTracker';
import MotivationGenerator from './components/MotivationGenerator';
import SkillSetter from './components/SkillSetter';
import DataExporter from './components/DataExporter';

const App: React.FC = () => {
  const [skill, setSkill] = useState<string | null>(() => localStorage.getItem('skillName'));
  const [sessions, setSessions] = useState<Session[]>(() => {
    const savedSessions = localStorage.getItem('sessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  
  const [motivation, setMotivation] = useState<string>('');
  const [isLoadingMotivation, setIsLoadingMotivation] = useState<boolean>(false);

  useEffect(() => {
    if (skill) {
      localStorage.setItem('skillName', skill);
    } else {
      localStorage.removeItem('skillName');
    }
  }, [skill]);

  useEffect(() => {
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }, [sessions]);

  const totalMinutes = useMemo(() => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  }, [sessions]);

  const totalHours = useMemo(() => totalMinutes / 60, [totalMinutes]);

  const addSession = (duration: number, notes: string) => {
    const newSession: Session = {
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      duration,
      notes,
    };
    setSessions(prevSessions => [...prevSessions, newSession]);
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
  };
  
  const handleSetSkill = (newSkill: string) => {
    if (newSkill.trim()) {
      setSkill(newSkill.trim());
      setSessions([]); // Reset sessions for a new skill
    }
  };

  const fetchMotivation = useCallback(async () => {
    if (!skill) return;
    setIsLoadingMotivation(true);
    setMotivation('');
    const quote = await getMotivation(skill);
    setMotivation(quote);
    setIsLoadingMotivation(false);
  }, [skill]);

  if (!skill) {
    return <SkillSetter onSkillSet={handleSetSkill} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header skillName={skill} />

        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">달성을 향한 진행 상황</h2>
              <ProgressBar currentValue={totalHours} maxValue={TOTAL_HOURS_GOAL} />
              <div className="mt-4 flex justify-between text-sm text-slate-400">
                <span>{totalHours.toFixed(2)} 시간 기록됨</span>
                <span>{TOTAL_HOURS_GOAL.toLocaleString()} 시간 목표</span>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">새로운 연습 기록</h2>
              <LogSessionForm onAddSession={addSession} />
            </div>

             <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">연습 기록</h2>
              <SessionHistory sessions={sessions} onDeleteSession={deleteSession} />
              <DataExporter sessions={sessions} skillName={skill} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">달성 목표</h2>
              <MilestoneTracker totalHours={totalHours} />
            </div>
             <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">AI 동기부여</h2>
                <MotivationGenerator 
                    skillName={skill}
                    onGetMotivation={fetchMotivation}
                    motivation={motivation}
                    isLoading={isLoadingMotivation}
                />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;