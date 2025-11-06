/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '../types';

class ApiService {
  downloadVegetationReport(session_id: string) {
      throw new Error('Method not implemented.');
  }
  [x: string]: any;
  private api: AxiosInstance;
  public readonly baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false, // Set to false for public endpoints
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
        console.error('❌ Error details:', error.response?.data);
        
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
    const response = await this.api.post('/api/auth/login', { email, password, captcha });
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/api/auth/logout');
    } finally {
      this.clearAuth();
    }
  }

  // Crop Prediction method
  async predictCrop(data: any): Promise<any> {
    console.log('🌾 Predict request');
    const response = await this.api.post('/api/crop/predict', data);
    return response.data;
  }

  // Bag Detection
  async detectBags(imageFile: File, confidenceThreshold: number = 0.3): Promise<any> {
    const formData = new FormData();
    formData.append('file', imageFile, imageFile.name);
    formData.append('confidence_threshold', confidenceThreshold.toString());

    console.log('📦 Bag detection request');
    const response = await this.api.post('/api/bag-detection/detect/public', formData, {
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
    console.log('📸 Files:', {
      rgb: rgbFile.name,
      swir: swirFile.name,
      nir: nirFile.name,
      date: acquisitionDate,
      location: location || 'Not specified'
    });

    const response = await this.api.post('/api/vegetation/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000,
    });
    
    console.log('✅ Analysis response:', response.data);
    return response.data;
  }

  // Get full plot URL (for images)
  getPlotUrl(plotPath: string): string {
    // plotPath comes like: /api/vegetation/plot/20251106_122717/NDVI.png
    const url = `${this.baseURL}${plotPath}`;
    console.log('📊 Plot URL:', url);
    return url;
  }

  // Generate and Download vegetation report (combined operation)
  async generateAndDownloadVegetationReport(reportData: any): Promise<void> {
    console.log('📄 Generating and downloading report:', reportData);
    
    try {
      // Make request to generate and receive PDF directly
      const response = await this.api.post('/api/vegetation/report/generate', reportData, {
        responseType: 'blob',
        timeout: 60000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('✅ Report blob received:', response.data.size, 'bytes');
      
      // Check if response is actually a blob (PDF)
      if (response.data.type === 'application/pdf') {
        // Create download link
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Vegetation_Report_${reportData.session_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        console.log('✅ Report downloaded successfully');
      } else {
        // Response might be JSON error
        const text = await response.data.text();
        const error = JSON.parse(text);
        throw new Error(error.error || 'Failed to generate report');
      }
    } catch (error: any) {
      console.error('❌ Report generation error:', error);
      
      // If error response is a blob, parse it
      if (error.response?.data instanceof Blob) {
        const text = await error.response.data.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || 'Failed to generate report');
        } catch (parseError) {
          throw new Error(text || 'Failed to generate report');
        }
      }
      
      throw error;
    }
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