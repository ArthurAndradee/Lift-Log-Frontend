export interface UserAuthProps {
    setUserId: (id: number) => void; 
}
export interface PreviousRecordsProps {
    userId: number | null;
}

export interface CreateExerciseProps {
    onAdd: (exercise: string) => void;
  }
  