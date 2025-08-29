import React from 'react';

interface HeaderProps {
  skillName: string;
}

const Header: React.FC<HeaderProps> = ({ skillName }) => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        달인 퀘스트
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        500시간의 법칙: <span className="font-bold text-cyan-300">{skillName}</span> 정복하기
      </p>
    </header>
  );
};

export default Header;