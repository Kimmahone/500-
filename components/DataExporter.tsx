import React from 'react';
import { Session } from '../types';

interface DataExporterProps {
  sessions: Session[];
  skillName: string;
}

const DataExporter: React.FC<DataExporterProps> = ({ sessions, skillName }) => {
  const exportToCSV = () => {
    if (sessions.length === 0) {
      alert('내보낼 데이터가 없습니다.');
      return;
    }

    const headers = ['ID', '날짜', '연습 시간 (분)', '메모'];
    const csvRows = [
      headers.join(','),
      ...sessions.map(session => {
        const notes = session.notes ? session.notes.replace(/"/g, '""') : '';
        const row = [
          session.id,
          session.date,
          session.duration,
          `"${notes}"`
        ];
        return row.join(',');
      })
    ];

    const csvString = csvRows.join('\n');
    // BOM to support UTF-8 for Excel
    const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const safeSkillName = skillName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.setAttribute('download', `${safeSkillName}_연습_기록.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={sessions.length === 0}
      className="mt-4 w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
    >
      CSV로 내보내기
    </button>
  );
};

export default DataExporter;