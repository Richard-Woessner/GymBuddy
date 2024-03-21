export interface Workout {
  Name: string;
  Id: string;
  Exercises: Exercise[];
  Completed?: boolean;
  Display?: boolean;
}

export interface Exercise {
  Id: string;
  Exercise: string;
  Sets: Set[];
  Type: string;
  NewExercise?: boolean;
}

export interface Set {
  SetNumber: number;
  Reps: number;
  Weight: number;
  Completed?: boolean;
}
