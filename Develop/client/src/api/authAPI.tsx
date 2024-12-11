import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch(
      '/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    }
)
    const data = response.json();

    if (!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('Could not fetch singular ticket');
  }
}



export { login };
