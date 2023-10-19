import { getWorkoutData } from '../test_data/getWorkoutData';
import { AxiosService } from './axiosService';

class WorkoutService extends AxiosService {
  public constructor() {
    super();
  }

  async getWorkouts() {
    try {
      const { data } = await this.axios.get<GetWorkoutResponse>('/api/workouts');
      return data;
    } catch (e) {
      console.error(e);
      return getWorkoutData as GetWorkoutResponse;
    }
  }
}

export interface GetWorkoutResponse {
  Workouts: Workout[];
  User: string;
}

export interface Workout {
  Name: string;
  Exersizes: Exersize[];
}

interface Exersize {
  Exersize: string;
  Sets: Set[];
  Type: string;
}

interface Set {
  SetNumber: number;
  Reps: number;
  Weight: number;
}

export const workoutService = new WorkoutService();
