import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return !!this.getToken();
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    if (!token) return true;
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.exp ? decoded.exp * 1000 < Date.now() : true;
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/login');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window .location.assign('/login');
  }
}

export default new AuthService();
