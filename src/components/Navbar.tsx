import Link from 'next/link';
import { HomeIcon, CalendarIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-gray-800 hover:text-gray-900">
              <HomeIcon className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">UFC Sobral</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              Atividades
            </Link>

            <Link
              href="/activities/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center text-sm"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nova Atividade
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}