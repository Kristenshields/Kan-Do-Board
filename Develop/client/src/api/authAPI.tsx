import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch(
      '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorMessage = await response.json(); 
      throw new Error(errorMessage.message || 'invalid user API response, check network tab!');
    }

    const data = await response.json();
    console.log('data from login:', data);

    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;

  } catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('Could not fetch singular ticket');
    
  }
}



export { login };
