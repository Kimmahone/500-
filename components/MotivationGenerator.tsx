import React from 'react';

interface MotivationGeneratorProps {
    skillName: string;
    onGetMotivation: () => void;
    motivation: string;
    isLoading: boolean;
}

const MotivationGenerator: React.FC<MotivationGeneratorProps> = ({ skillName, onGetMotivation, motivation, isLoading }) => {
  return (
    <div className="space-y-4">
        <button
            onClick={onGetMotivation}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
            )}
           {isLoading ? '생성 중...' : '동기부여 받기'}
        </button>
        {motivation && (
            <div className="bg-slate-700/50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-slate-300 italic">"{motivation}"</p>
            </div>
        )}
    </div>
  );
};

export default MotivationGenerator;