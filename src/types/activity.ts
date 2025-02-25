export interface Activity {
    id: string;
    name: string;
    responsible: string;
    date: string;
    description: string;
    participants: string[];
    createdAt: Date;
  }
  
  export type ActivityFormData = Omit<Activity, 'id' | 'createdAt' | 'participants'>;
  