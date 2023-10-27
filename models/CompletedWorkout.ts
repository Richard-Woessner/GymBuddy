/**
 * Description placeholder
 * @date 10/27/2023 - 12:01:07 PM
 *
 * @export
 * @interface CompletedWorkout
 * @typedef {CompletedWorkout}
 */
export interface CompletedWorkout {
  exersizes: Exersize[];
  date: Date;
}

/**
 * Description placeholder
 * @date 10/27/2023 - 12:00:59 PM
 *
 * @export
 * @interface Exersize
 * @typedef {Exersize}
 */
/**
 * Description placeholder
 * @date 10/27/2023 - 12:01:12 PM
 *
 * @export
 * @interface Exersize
 * @typedef {Exersize}
 */
export interface Exersize {
  totalWeight: number;
  totalReps: number;
  exersizeName: string;
  sets: Set[];
}

interface Set {
  setNumber: number;
  reps: number;
  weight: number;
}
