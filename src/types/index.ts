/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  sessionId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  captcha: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  sessionId?: string;
}

export interface Demo {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  features: string[];
  url?: string;
  launchUrl?: string;
}

export interface DemoDetailsResponse {
  demo: Demo;
  detailedDescription: string;
  architecture: string[];
  useCases: string[];
  benefits: string[];
  statistics?: {
    label: string;
    value: string;
  }[];
}

export interface CropPredictionRequest {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface CropPredictionResponse {
  success: boolean;
  message: string;
  data: {
    crop: string;
    confidence: number;
    parameters: {
      N: number;
      P: number;
      K: number;
      temperature: number;
      humidity: number;
      ph: number;
      rainfall: number;
    };
    user_email: string;
    user_id: string | null;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}