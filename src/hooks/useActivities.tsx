"use client";

import { useState, useEffect } from 'react';
import { Activity } from '../types/activity';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('activities');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const createActivity = (data: Omit<Activity, 'id'>) => {
    const newActivity: Activity = {
      ...data,
      id: crypto.randomUUID(),
      participants: [],
      createdAt: new Date(),
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const updateActivity = (id: string, updatedActivity: Activity) => {
    setActivities(prev => 
      prev.map(activity => activity.id === id ? updatedActivity : activity))
  };
  
  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  return {
    activities,
    createActivity,
    updateActivity,
    deleteActivity,
  };
};