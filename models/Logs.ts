export interface Log {
  date: Date;
  exercises: Exercise[];
}

interface Exercise {
  totalWeight: number;
  exerciseName: string;
  totalReps: number;
  sets: LogSet[];
}

interface LogSet {
  completed: boolean;
  setNumber: number;
  reps: number;
  weight: number;
}

interface Date {
  seconds: number;
  nanoseconds: number;
}
