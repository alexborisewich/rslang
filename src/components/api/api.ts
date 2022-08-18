import { Dictionary,Registration,StatProps,StatBackProps } from "../../common/interface/interface";

const baseApi:string = 'https://rslang-172.herokuapp.com/';
const wordsApi:string = `${baseApi}words?all=true`;
const STATISTICS: StatBackProps = {
  "statistics": {
    "audioCall": [
      {
        "data": "",
        "learningWords": [],
        "winStreak": 0,
        "generalCountLearningWords": 0,
        "countOfRightAnswers": 0
      }
    ],
    "sprint": [
      {
        "data": "0",
        "learningWords": [],
        "winStreak": 0,
        "generalCountLearningWords": 0,
        "countOfRightAnswers": 0
      }
    ]
  }
}



export const getDataWords = async():Promise<Array<Dictionary>> => {
const response = await fetch(`${wordsApi}`);

if(!response.ok){
  throw new Error(`Could not fetch ${wordsApi}, received ${response.status}`);
}
return  await response.json();
}

export const getDataPage = async(group:string | number,page?:number):Promise<Dictionary[]> => {
  const response = await fetch(`${baseApi}words?page=${page}&group=${group}`);
  if (!response.ok) {
    throw new Error(`Could not fetch ${`${baseApi}words?page=${page}&group=${group}`}, received ${response.status}`);
  }
  return await response.json();
}

export const loginUser = async (values:Registration): Promise<{message:string,userId:string,token:string}> => {
  const response = await fetch(`${baseApi}signin`,{
    method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
  });
  const content = await response.json();

  if (content.error){
    throw new Error();
  }
  return {message: content.message, userId: content.userId, token:content.token};
}


export const createUser = async (user:Registration):Promise<{id:string,email:string}> => {
  const rawResponse = await fetch(`${baseApi}users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();

  return{id:content.id, email:content.email }
};


export const getUserWord = async () => {
  const{userId:id,token:newToken} = await loginUser(values);
  const url:string = `${baseApi}users/${id}/words/`;

  const rawResponse = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${newToken}`,
      'Accept': 'application/json',
    }
  });
  if (!rawResponse.ok) {
    throw new Error(`Could not fetch ${url}, received ${rawResponse.status}`);
  }
  return await rawResponse.json();
};

export const createUserWord = async (userId:string, wordId:string, word:string) => {
  const{token:newToken} = await loginUser(values);
  const rawResponse = await fetch(`${baseApi}users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${newToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await rawResponse.json();
  return content;
};

const getStatistics = async (user:{userId:string,token:string}): Promise<StatProps> => {

  const rawResponse = await fetch(`${baseApi}users/${user.userId}/statistics`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
    }
  });
  if (rawResponse.ok) {
    const content = await rawResponse.json();
    if (!content.statistics.audioCall && !content.statistics.sprint) {
      setStatistics(user, STATISTICS);
      return STATISTICS.statistics;
    } else return await content;
  } else {
    setStatistics(user, STATISTICS);
    return STATISTICS.statistics;
  }
};

const setStatistics = async (user:{userId:string,token:string}, statistic: StatBackProps) => {
  const rawResponse = await fetch(`${baseApi}users/${user.userId}/statistics`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistic),
  });
};
















