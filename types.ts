export interface Session {
  id: string;
  date: string;
  duration: number; // in minutes
  notes: string;
}

export interface Milestone {
  level: string;
  hours: number;
  description: string;
}
