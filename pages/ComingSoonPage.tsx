
import React from 'react';

interface ComingSoonPageProps {
  title: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[60vh]">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      <p className="mt-4 text-xl text-gray-600">Esta sección estará disponible próximamente.</p>
      <div className="mt-8">
        <svg className="w-24 h-24 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.53 16.122l-.156.39a1.18 1.18 0 00.568 1.476l.156.078a1.18 1.18 0 001.476-.568l.156-.39m-1.192-1.192a.394.394 0 01-.557 0l-.156-.156a.394.394 0 010-.557l.156-.156a.394.394 0 01.557 0l.156.156a.394.394 0 010 .557l-.156.156z" />
        </svg>
      </div>
    </div>
  );
};

export default ComingSoonPage;
