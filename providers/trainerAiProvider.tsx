// import { createContext, useCallback, useContext, useMemo, useState } from 'react';
// import { hashObject } from '../helpers/func';
// import { Exercise, Workout, workoutService } from '../services/workoutService';

// interface TrainerAiContextType {
//   workouts: Workout[] | null;
//   isLoading: boolean;

//   getWorkouts: () => Promise<Workout[]>;
// }

// const initialValues: WorkoutsContextType = {
//   workouts: null,
//   isLoading: false,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   getWorkouts: function (): Promise<Workout[]> {
//     throw new Error('Function not implemented.');
//   },
// };

// export const WorkoutsContext = createContext<WorkoutsContextType>(initialValues);

// export interface WorkoutsProviderProps {
//   children: JSX.Element | JSX.Element[];
// }

// export const WorkoutsProvider = (props: WorkoutsProviderProps) => {
//   const [workouts, setWorkouts] = useState<Workout[] | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const getWorkouts = useCallback(async () => {
//     console.log('Getting workouts');

//     const tempWorkouts: Workout[] = [];

//     try {
//       setIsLoading(true);

//       const workoutres = await workoutService.getWorkouts();

//       const x = workoutres!.Workouts.map((workout, i) => {
//         return {
//           ...workout,
//           Id: i.toString(),
//         };
//       });

//       console.log('Workouts returned', x.length);

//       // const x = WorkoutDummy.Workouts.map((workout, i) => {
//       //   return {
//       //     ...workout,
//       //     Id: i.toString(),
//       //   } as Workout;
//       // });

//       x.forEach((workout) => {
//         workout.Exercises.forEach((exercise: Exercise) => {
//           exercise.Id = hashObject(exercise).toString();

//           return exercise;
//         });
//       });

//       setWorkouts(x);
//       //setWorkouts(x);
//       tempWorkouts.push(...x);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//       return tempWorkouts;
//     }
//   }, []);

//   const values = useMemo(
//     () => ({
//       workouts,
//       isLoading,

//       getWorkouts,
//     }),
//     [workouts, isLoading, getWorkouts]
//   );

//   return <WorkoutsContext.Provider value={values}>{props.children}</WorkoutsContext.Provider>;
// };

// export const useWorkouts = () => {
//   const context = useContext(WorkoutsContext);

//   if (context === undefined) {
//     throw new Error('useWorkouts must be used within a WorkoutsProvider component.');
//   }

//   return context;
// };
