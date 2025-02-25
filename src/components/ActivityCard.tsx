import Link from 'next/link';
import { Activity } from '../types/activity';
import { CalendarIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{activity.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
        </div>
        <Link
          href={`/activities?id=${activity.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Ver detalhes →
        </Link>
      </div>
      
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <UserCircleIcon className="h-5 w-5 mr-1" />
          <span>{activity.responsible}</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-1" />
          <span>{new Date(activity.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}