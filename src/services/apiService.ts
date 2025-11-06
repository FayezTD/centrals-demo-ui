/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '../types';

class ApiService {
  private api: AxiosInstance;
  private readonly baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('✅ Sending request with token:', token.substring(0, 30) + '...');
        } else {
          console.warn('⚠️ No token found for request to:', config.url);
        }

        const sessionId = this.getSessionId();
        if (sessionId) {
          config.headers['X-Session-ID'] = sessionId;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        console.log('✅ API Response:', response.status, response.config.url);
        return response;
      },
      (error) => {
        console.error('❌ API Error:', error.response?.status, error.config?.url);
        
        if (error.response?.status === 401) {
          console.warn('⚠️ Got 401 - Token may be invalid or expired');
        }
        
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: any): ApiError {
    if (error.response) {
      return {
        message: error.response.data?.message || error.response.data?.error || 'An error occurred',
        code: error.response.status.toString(),
        details: error.response.data,
      };
    } else if (error.request) {
      return {
        message: 'No response from server. Please check if the backend is running and CORS is configured.',
        code: 'NETWORK_ERROR',
      };
    } else {
      return {
        message: error.message || 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
      };
    }
  }

  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private getSessionId(): string | null {
    return localStorage.getItem('session_id');
  }

  public clearAuth(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('session_id');
    localStorage.removeItem('user_data');
  }

  // Authentication methods
  async login(email: string, password: string, captcha: string): Promise<any> {
    const endpoint = import.meta.env.VITE_LOGIN_API_ENDPOINT || '/auth/login';
    console.log('🔐 Login request to:', this.baseURL + endpoint);
    const response = await this.api.post(endpoint, { email, password, captcha });
    return response.data;
  }

  async logout(): Promise<void> {
    const endpoint = import.meta.env.VITE_LOGOUT_API_ENDPOINT || '/auth/logout';
    try {
      await this.api.post(endpoint);
    } finally {
      this.clearAuth();
    }
  }

  async checkSession(): Promise<any> {
    const endpoint = import.meta.env.VITE_SESSION_CHECK_API_ENDPOINT || '/auth/session';
    const response = await this.api.get(endpoint);
    return response.data;
  }

  // Crop Prediction method
  async predictCrop(data: {
    N: number;
    P: number;
    K: number;
    temperature: number;
    humidity: number;
    ph: number;
    rainfall: number;
  }): Promise<any> {
    const endpoint = import.meta.env.VITE_CROP_PREDICT_API_ENDPOINT || '/crop/predict';
    console.log('🌾 Predict request to:', this.baseURL + endpoint);
    const token = this.getToken();
    console.log('🔑 Using token:', token ? token.substring(0, 30) + '...' : 'NO TOKEN');
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  // Bag Detection - FIXED to match backend expectations
  async detectBags(imageFile: File, confidenceThreshold: number = 0.3): Promise<any> {
    const formData = new FormData();
    
    // Backend expects 'file' as the key (from your Python code: request.files['file'])
    formData.append('file', imageFile, imageFile.name);
    
    // Optional: add confidence threshold if backend supports it
    formData.append('confidence_threshold', confidenceThreshold.toString());

    console.log('📦 Bag detection request');
    console.log('📸 Image file:', imageFile.name, 'Size:', imageFile.size, 'Type:', imageFile.type);
    console.log('🎯 Confidence threshold:', confidenceThreshold);

    const response = await this.api.post('/bag-detection/detect/public', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Don't set timeout too low for image upload
      timeout: 60000,
    });
    
    console.log('✅ Detection response received:', response.data);
    return response.data;
  }

  // Demo methods
  async getDemoDetails(demoId: string): Promise<any> {
    const endpoint = import.meta.env.VITE_DEMO_DETAILS_API_ENDPOINT || '/demos';
    const response = await this.api.get(`${endpoint}/${demoId}`);
    return response.data;
  }

  async getLaunchDemoUrl(demoId: string): Promise<any> {
    const endpoint = import.meta.env.VITE_DEMO_DETAILS_API_ENDPOINT || '/demos';
    const response = await this.api.get(`${endpoint}/${demoId}/launch`);
    return response.data;
  }

  // Generic methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }
}

export default new ApiService();