import { AxiosService } from './axiosService';

class UserService extends AxiosService {
  public constructor() {
    super();
  }

  async postUsers() {
    try {
      const { data } = await this.axios.post('/api/users');
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export const userService = new UserService();