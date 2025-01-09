import { FaMusic } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <FaMusic className="text-white text-3xl" />
            <span className="ml-2 text-white text-xl font-bold">Song Ranker</span>
          </div>
        </div>
      </div>
    </nav>
  );
}