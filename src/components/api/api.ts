import { Registration, Statistic } from '../../common/interface/interface';
import { getJwtToken, getRefreshToken, getUserId, logOut } from '../../common/utils/utils';

class API {
  baseApi = 'https://rslang-172.herokuapp.com/';

  async getDataPage(group: string | number, page?: number) {
    const response = await fetch(`${this.baseApi}words?page=${page}&group=${group}`);
    return response;
  }

  async getDataWord(wordID: string) {
    const response = await fetch(`${this.baseApi}words/${wordID}`);
    return response;
  }

  // ---USER---

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

  async getUser() {
    const response = await fetch(`${this.baseApi}users/${getUserId()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        Accept: 'application/json',
      },
    });
    return response;
  }

  async getNewUserToken() {
    const response = await fetch(`${this.baseApi}users/${getUserId()}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getRefreshToken()}`,
        Accept: 'application/json',
      },
    });
    return response.ok ? response : logOut();
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

  // ---USER WORDS

  async getUserWord() {
    const response = await fetch(`${this.baseApi}users/${getUserId()}/words/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        Accept: 'application/json',
      },
    });
    return response;
  }

  async createUserWord(wordId: string, word: string) {
    const response = await fetch(`${this.baseApi}users/${getUserId()}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    return response;
  }

  async getStatistic() {
    const response = await fetch(`${this.baseApi}users/${getUserId()}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        Accept: 'application/json',
      },
    });
    return response;
  }

  async setStatistic(statistic: Statistic) {
    const response = await fetch(`${this.baseApi}users/${getUserId()}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getJwtToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistic),
    });
    return response;
  }

  async setUserStat(userId: string, token: string, statistic: Statistic) {
    const response = await fetch(`${this.baseApi}users/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistic),
    });
    return response;
  }
}

const api = new API();
export default api;
