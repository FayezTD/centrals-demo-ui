/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '../types';

class ApiService {
  private api: AxiosInstance;
  public readonly baseURL: string;
    downloadVegetationReport: any;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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

  // Crop Prediction
  async predictCrop(data: any): Promise<any> {
    const response = await this.api.post('/api/crop/predict', data);
    return response.data;
  }

  // Bag Detection
  async detectBags(imageFile: File, confidenceThreshold: number = 0.3): Promise<any> {
    const formData = new FormData();
    formData.append('file', imageFile, imageFile.name);
    formData.append('confidence_threshold', confidenceThreshold.toString());

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

    const response = await this.api.post('/api/vegetation/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000,
    });
    
    console.log('✅ Analysis response:', response.data);
    return response.data;
  }

  // Get full plot URL
  getPlotUrl(plotPath: string): string {
    const url = `${this.baseURL}${plotPath}`;
    console.log('📊 Plot URL:', url);
    return url;
  }

  // Generate vegetation report (returns path, not blob)
  async generateVegetationReport(reportData: any): Promise<any> {
    console.log('📄 Generating vegetation report:', reportData);
    
    const response = await this.api.post('/api/vegetation/report/generate', reportData, {
      timeout: 60000,
    });
    
    console.log('✅ Report generated:', response.data);
    return response.data;
  }

  // Get full download URL for report
  getReportDownloadUrl(pdfUrl: string): string {
    const url = `${this.baseURL}${pdfUrl}`;
    console.log('📥 Report download URL:', url);
    return url;
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


  // Video Analysis Methods
  async getMediaVideos(): Promise<any> {
    const response = await this.api.get('/api/video-analysis/videos/media');
    return response.data;
  }

  async getResultVideos(): Promise<any> {
    const response = await this.api.get('/api/video-analysis/videos/result');
    return response.data;
  }

  async getVideoInfo(filename: string): Promise<any> {
    const response = await this.api.get(`/api/video-analysis/video/media/${filename}`);
    return response.data;
  }

  async analyzeVideo(filename: string): Promise<any> {
    const response = await this.api.post('/api/video-analysis/analyze', { filename });
    return response.data;
  }

  async getAnalysisResult(sessionId: string): Promise<any> {
    const response = await this.api.get(`/api/video-analysis/result/${sessionId}`);
    return response.data;
  }

  getVideoUrl(path: string): string {
    // Remove 'static\' or 'static/' prefix and normalize path
    const normalizedPath = path.replace(/^static[\\\/]/, '').replace(/\\/g, '/');
    return `${this.baseURL}/${normalizedPath}`;
  }

  getVideoDownloadUrl(filename: string): string {
    return `${this.baseURL}/api/video-analysis/result/${filename}?download=true`;
  }
}



export default new ApiService();