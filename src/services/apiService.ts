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
      timeout: 120000, // 2 minutes for satellite image processing
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
      (error) => Promise.reject(error)
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

  // Crop Prediction method
  async predictCrop(data: any): Promise<any> {
    const endpoint = import.meta.env.VITE_CROP_PREDICT_API_ENDPOINT || '/crop/predict';
    console.log('🌾 Predict request to:', this.baseURL + endpoint);
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  // Bag Detection
  async detectBags(imageFile: File, confidenceThreshold: number = 0.3): Promise<any> {
    const formData = new FormData();
    formData.append('file', imageFile, imageFile.name);
    formData.append('confidence_threshold', confidenceThreshold.toString());

    console.log('📦 Bag detection request');
    const response = await this.api.post('/bag-detection/detect/public', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
    
    return response.data;
  }

  // Vegetation Index Analysis
  async analyzeVegetation(
    rgbFile: File,
    swirFile: File,
    nirFile: File,
    acquisitionDate: string,
    location?: string
  ): Promise<any> {
    const formData = new FormData();
    formData.append('rgb_file', rgbFile, rgbFile.name);
    formData.append('swir_file', swirFile, swirFile.name);
    formData.append('nir_file', nirFile, nirFile.name);
    formData.append('acquisition_date', acquisitionDate);
    
    if (location) {
      formData.append('location', location);
    }

    console.log('🛰️ Vegetation analysis request');
    console.log('📸 RGB file:', rgbFile.name);
    console.log('📸 SWIR file:', swirFile.name);
    console.log('📸 NIR file:', nirFile.name);
    console.log('📅 Date:', acquisitionDate);
    console.log('📍 Location:', location || 'Not specified');

    const response = await this.api.post('/vegetation/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000, // 2 minutes for processing
    });
    
    console.log('✅ Analysis response:', response.data);
    return response.data;
  }

  // Get vegetation plot image
  async getVegetationPlot(sessionId: string, plotType: string): Promise<string> {
    const url = `/vegetation/plot/${sessionId}/${plotType}.png`;
    console.log('📊 Fetching plot:', url);
    return this.baseURL + url;
  }

  // Generate vegetation report
  async generateVegetationReport(reportData: any): Promise<any> {
    console.log('📄 Generating vegetation report:', reportData);
    
    const response = await this.api.post('/vegetation/report/generate', reportData, {
      timeout: 60000,
    });
    
    console.log('✅ Report generated:', response.data);
    return response.data;
  }

  // Download vegetation report (returns blob)
  async downloadVegetationReport(sessionId: string): Promise<Blob> {
    const response = await this.api.get(`/vegetation/report/download/${sessionId}`, {
      responseType: 'blob',
    });
    
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