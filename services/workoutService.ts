import { AxiosService } from './axiosService';

class WorkoutService extends AxiosService {
  public constructor() {
    super();
  }

  async getWorkouts() {
    try {
      const { data } = await this.axios.get<GetWorkoutResponse>('/api/workouts', {
        params: { userId: '6urOxvgJCsYFv0ZaIY2IG1lx7ZC2' },
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}

export interface GetWorkoutResponse {
  Workouts: Workout[];
  User: string;
}

export interface Workout {
  Name: string;
  Id: string;
  Exercises: Exercise[];
  Completed?: boolean;
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

export const workoutService = new WorkoutService();
