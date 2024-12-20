import { UserLogin } from "../interfaces/UserLogin";

// This function should make a POST request to the login route

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
      
    });
  
    const data = await response.json();
  
    console.log('Response status:', response.status);
    console.log('Response body:', data);

   
if (!response.ok) {
  throw new Error('Check the username and password and try again');
}

return data;
  } catch (error) {
    console.error('Error logging in:', error);
    return Promise.reject("could not fetch user data");
  }
}

export { login };
