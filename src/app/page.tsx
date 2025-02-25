"use client"; // Adicione esta linha

import { useActivities } from '../hooks/useActivities';
import ActivityCard from '../components/ActivityCard';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const { activities } = useActivities();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Atividades Acadêmicas</h1>
        <Link
          href="/activities/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Nova Atividade
        </Link>
      </div>

      <div>
        {activities.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhuma atividade cadastrada ainda</p>
          </div>
        ) : (
          activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
}
