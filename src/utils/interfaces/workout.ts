export interface Set {
  setNumber: number;
  reps:number;
  weight: number;
}

export interface WorkoutRecord {
  id: number;
  userId: number;
  exercise: string;
  sets: Set[];
  date: string;
}