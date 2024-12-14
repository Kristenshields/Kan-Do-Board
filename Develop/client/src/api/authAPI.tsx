import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
   
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
  
    console.log('Response status:', response.status);
    console.log('Response body:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }
    return data;

  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
}



export { login };
