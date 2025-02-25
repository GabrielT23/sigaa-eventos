"use client";

import { ClockIcon, UserGroupIcon, TrashIcon, PlusIcon, MinusSmallIcon } from '@heroicons/react/24/outline';
import { useActivities } from '@/hooks/useActivities';
import { Activity } from '@/types/activity';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';

export default function ActivityDetails() {
  const router = useRouter();
  const { activities, updateActivity, deleteActivity } = useActivities();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newParticipant, setNewParticipant] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    
    if (id && activities.length > 0) {
      const found = activities.find(a => a.id === id);
      if (found) {
        setActivity(found);
      } else {
        router.push('/404');
      }
      setIsLoading(false);
    }
  }, [activities, router]);

  const handleSave = () => {
    if (activity) {
      updateActivity(activity.id, activity);
      router.push('/');
    }
  };

  const handleDelete = () => {
    if (activity) {
      deleteActivity(activity.id);
      router.push('/');
    }
  };

  const handleChange = (field: keyof Activity, value: string) => {
    if (activity) {
      setActivity({ ...activity, [field]: value });
    }
  };

  const handleParticipantChange = (index: number, value: string) => {
    if (activity) {
      const newParticipants = [...activity.participants];
      newParticipants[index] = value;
      setActivity({ ...activity, participants: newParticipants });
    }
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim() && activity) {
      const newParticipants = [...activity.participants, newParticipant.trim()];
      setActivity({ ...activity, participants: newParticipants });
      setNewParticipant('');
    }
  };

  const handleRemoveParticipant = (index: number) => {
    if (activity) {
      const newParticipants = activity.participants.filter((_, i) => i !== index);
      setActivity({ ...activity, participants: newParticipants });
    }
  };

  if (isLoading || !activity) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12 text-gray-500">Carregando...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Voltar
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              <input
                type="text"
                value={activity.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </h1>
            
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Salvar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
              >
                <TrashIcon className="h-5 w-5" />
                Excluir
              </button>
            </div>
          </div>

          <div className="space-y-4 text-gray-600">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="h-5 w-5" />
              <input
                type="text"
                value={activity.responsible}
                onChange={(e) => handleChange('responsible', e.target.value)}
                className="border rounded-md p-2 w-full"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              <input
                type="date"
                value={new Date(activity.date).toISOString().split('T')[0]}
                onChange={(e) => handleChange('date', e.target.value)}
                className="border rounded-md p-2"
              />
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Descrição:</h3>
              <textarea
                value={activity.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="border rounded-md p-2 w-full h-32"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Participantes ({activity.participants.length})</h3>
              <div className="grid gap-2">
                {activity.participants.map((participant, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                    <input
                      type="text"
                      value={participant}
                      onChange={(e) => handleParticipantChange(index, e.target.value)}
                      className="ml-2 bg-transparent flex-1"
                    />
                    <button
                      onClick={() => handleRemoveParticipant(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <MinusSmallIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                    placeholder="Novo participante"
                    className="border rounded-md p-2 flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                  />
                  <button
                    onClick={handleAddParticipant}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
                  >
                    <PlusIcon className="h-5 w-5" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}