import { getWorkoutData } from '../test_data/getWorkoutData';
import { AxiosService } from './axiosService';

class LogsService extends AxiosService {
  public constructor() {
    super();
  }

  async getLogs() {
    try {
      const { data } = await this.axios.get<GetWorkoutResponse>('/api/logs', {
        params: { userId: '6urOxvgJCsYFv0ZaIY2IG1lx7ZC2' },
      });

      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async postLog(workout: object) {
    try {
      const { data } = await this.axios.post('/api/logs', {
        userId: '6urOxvgJCsYFv0ZaIY2IG1lx7ZC2',
        data: workout,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}

interface GetWorkoutResponse {
  userId: string;
  completedWorkouts: CompletedWorkout[];
}

export interface CompletedWorkout {
  exersizes: Exersize[];
  date: Date;
}

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

export const logsService = new LogsService();
