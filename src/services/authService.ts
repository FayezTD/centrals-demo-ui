/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import apiService from './apiService';
import { LoginCredentials, LoginResponse, User } from '../types';

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private readonly SESSION_KEY = 'session_id';

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiService.login(
        credentials.email,
        credentials.password,
        credentials.captcha
      );

      console.log('📥 Full Login API Response:', JSON.stringify(response, null, 2));

      // Handle successful response
      if (response.success) {
        // IMPORTANT: Extract token from nested structure
        // Your API returns: { data: { token: "...", user: {...} } }
        let token = response.data?.token || response.token || response.access_token;
        
        if (token) {
          this.setToken(token);
          console.log('✅ Token stored successfully:', token.substring(0, 30) + '...');
        } else {
          console.error('❌ No token found in response:', response);
          throw new Error('Token not received from server');
        }
        
        // Extract user from nested structure
        const userData = response.data?.user || response.user;
        
        const user: User = {
          id: userData?.user_id || userData?.id || '1',
          email: userData?.email || credentials.email,
          name: userData?.name || credentials.email.split('@')[0],
        };
        
        this.setUser(user);
        console.log('✅ User data stored:', user);
        
        // Store session ID if provided
        const sessionId = response.data?.session_id || response.session_id || response.sessionId;
        if (sessionId) {
          this.setSessionId(sessionId);
        }

        return {
          success: true,
          message: response.message || 'Login successful',
          token: token,
          user: user,
        };
      }

      return {
        success: false,
        message: response.message || 'Login failed',
      };
    } catch (error: any) {
      console.error('❌ Login service error:', error);
      throw new Error(error.message || 'Login failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  async checkSession(): Promise<boolean> {
    try {
      const response = await apiService.checkSession();
      return response.valid === true || response.success === true;
    } catch (error) {
      return false;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('🔐 isAuthenticated check:', token ? 'YES' : 'NO');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getSessionId(): string | null {
    return localStorage.getItem(this.SESSION_KEY);
  }

  private setSessionId(sessionId: string): void {
    localStorage.setItem(this.SESSION_KEY, sessionId);
  }

  clearAuth(): void {
    console.log('🧹 Clearing auth data...');
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.SESSION_KEY);
  }
}

export default new AuthService();