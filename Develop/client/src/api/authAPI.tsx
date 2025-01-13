import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error('Login failed. please check your credentials.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during loging:', error);
    throw error;
  }
}


export { login };
