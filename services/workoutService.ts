import { AxiosService } from './axiosService';

class WorkoutService extends AxiosService {
  public constructor() {
    super();
  }

  async getWorkouts() {
    try {
      const { data } = await this.axios.get('/api/workouts');
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export const workoutService = new WorkoutService();
