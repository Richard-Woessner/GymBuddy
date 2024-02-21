import { AxiosService } from './axiosService';

class TrainerAiService extends AxiosService {
  public constructor() {
    super();
  }

  async getLogs() {
    try {
      const OPENAI_API_KEY = '';

      const response = await this.axios.get('https://api.openai.com/v1/chat/completions', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        data: {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'Say this is a test!' }],
          temperature: 0.7,
        },
      });
      console.log(response.data.choices[0].text);
    } catch (error) {
      console.log(JSON.stringify(error));

      console.error('Error:', error);
    }
  }

  //   async askTrainer() {
  //     const completion = await openai.Chat.Completions.create({
  //       messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
  //       model: 'gpt-3.5-turbo',
  //     });
  //   }
}

export const trainerAiService = new TrainerAiService();
