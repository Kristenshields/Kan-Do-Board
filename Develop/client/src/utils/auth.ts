import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp ? decoded.exp < currentTime : true;
      
    } catch (error) {
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    const token = localStorage.getItem('token') || '';
    console.log('Retrieved token:', token);
    return token;
  
    } 

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    console.log('Set token:', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
