"use client";

import { useRouter } from 'next/navigation';
import ActivityForm from '../../../components/ActivityForm';
import { useActivities } from '../../../hooks/useActivities';

export default function CreateActivity() {
  const router = useRouter();
  const { createActivity } = useActivities();

  const handleSubmit = (data: any) => {
    createActivity(data);
    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Cadastrar Nova Atividade</h1>
      <ActivityForm onSubmit={handleSubmit} />
    </div>
  );
}