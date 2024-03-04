import { CompletedWorkout } from '@models/CompletedWorkout';
import { AxiosService } from './axiosService';

class LogsService extends AxiosService {
  public constructor() {
    super();
  }

  async getLogs() {
    try {
      const { data } = await this.axios.get<GetLogsResponse>('/api/logs', {
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

interface GetLogsResponse {
  userId: string;
  completedWorkouts: CompletedWorkout[];
}

export const logsService = new LogsService();
