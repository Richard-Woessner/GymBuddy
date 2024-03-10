import { AxiosService } from './axiosService';

class WorkoutService extends AxiosService {
  public constructor() {
    super();
  }

  async getWorkouts(userId: string) {
    try {
      const { data } = await this.axios.get<GetWorkoutsResponse>('/api/workouts', {
        params: { userId: userId },
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteWorkout(workoutId: string) {
    try {
      const { data } = await this.axios.delete<GetWorkoutsResponse>('/api/workouts', {
        data: { workoutId: workoutId, userId: '6urOxvgJCsYFv0ZaIY2IG1lx7ZC2' },
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}

export interface GetWorkoutRequest {
  userId: string;
}

export interface PostWorkoutRequest {
  userId: string;
}

export interface GetWorkoutsResponse {
  User: string;
  Workouts: Workout[];
}

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

export const workoutService = new WorkoutService();
