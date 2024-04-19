import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="m-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-20">Student Academic Data Core </h1>

      <Link to="/year1/1" className="cursor-pointer m-2 w-96 bg-blue-200 rounded-md shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">1st Year</Link>
      <Link to="/year2/2" className="cursor-pointer m-2 w-96 bg-blue-200 rounded-md shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">2nd Year</Link>
      <Link to="/year3/3" className="cursor-pointer m-2 w-96 bg-blue-200 rounded-md shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">3rd Year</Link>
      <Link to="/year4/4" className="cursor-pointer m-2 w-96 bg-blue-200 rounded-md shadow-lg p-4 transform transition-transform duration-300 hover:scale-105">4th Year</Link>
    </div>
  );
}
