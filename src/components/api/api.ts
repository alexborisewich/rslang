import {Registration,StatBackProps } from "../../common/interface/interface";

class API {
  baseApi = 'https://rslang-172.herokuapp.com/';

  wordsApi = `${this.baseApi}words?all=true`;

  STATISTICS: StatBackProps = {
    statistics: {
      audioCall: [
        {
          data: '',
          learningWords: [],
          winStreak: 0,
          generalCountLearningWords: 0,
          countOfRightAnswers: 0,
        },
      ],
      sprint: [
        {
          data: '0',
          learningWords: [],
          winStreak: 0,
          generalCountLearningWords: 0,
          countOfRightAnswers: 0,
        },
      ],
    },
  };

  async getWordsData() {
    const response = await fetch(`${this.wordsApi}`);
    return response;
  }

  async getDataPage(group: string | number, page?: number) {
    const response = await fetch(`${this.baseApi}words?page=${page}&group=${group}`);
    return response;
  }

  async loginUser(body: Registration) {
    const response = await fetch(`${this.baseApi}signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  async createUser(body: Registration) {
    const response = await fetch(`${this.baseApi}users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return response;
  }

  async getUserWord(id: number, token: string) {
    const url = `${this.baseApi}users/${id}/words/`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response;
  }

  async createUserWord(userId: string, token: string, wordId: string, word: string) {
    const response = await fetch(`${this.baseApi}users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    return response;
  }

  async getStatistic(user: { userId: string; token: string }) {
    const response = await fetch(`${this.baseApi}users/${user.userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
      },
    });
    return response;
  }

  async setStatistic(user: { userId: string; token: string }, statistic: StatBackProps) {
    await fetch(`${this.baseApi}users/${user.userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistic),
    });
  }
}

const api = new API();
export default api;

















