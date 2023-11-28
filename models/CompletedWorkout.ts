/**
 * Description placeholder
 * @date 10/27/2023 - 12:01:07 PM
 *
 * @export
 * @interface CompletedWorkout
 * @typedef {CompletedWorkout}
 */
export interface CompletedWorkout {
  exercises: Exercise[];
  date: Date;
}

/**
 * Description placeholder
 * @date 10/27/2023 - 12:00:59 PM
 *
 * @export
 * @interface Exercise
 * @typedef {Exercise}
 */
/**
 * Description placeholder
 * @date 10/27/2023 - 12:01:12 PM
 *
 * @export
 * @interface Exercise
 * @typedef {Exercise}
 */
export interface Exercise {
  totalWeight: number;
  totalReps: number;
  exerciseName: string;
  sets: Set[];
}

interface Set {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}
