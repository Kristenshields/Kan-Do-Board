import { UserLogin } from "../interfaces/UserLogin";

// This function should make a POST request to the login route

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
      
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
   
    const data = await response.json();
  
    console.log('Response status:', response.status);
    console.log('Response body:', data);

    return data;

  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
}



export { login };
