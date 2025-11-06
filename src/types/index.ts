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

// Bag Detection Types
export interface BagDetectionRequest {
  image: File;
  confidence_threshold?: number;
}

export interface BagDetectionBBox {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface BagDetectionCenter {
  x: number;
  y: number;
}

export interface BagDetection {
  id: number;
  class: string;
  original_class: string;
  confidence: number;
  bbox: BagDetectionBBox;
  center: BagDetectionCenter;
  area: number;
}

export interface BagDetectionResponse {
  success: boolean;
  message: string;
  data: {
    annotated_image: string;
    detections: BagDetection[];
    categories: Record<string, number>;
    total_count: number;
    confidence_threshold: number;
    model_used: string;
    timestamp: string;
  };
}

// Vegetation Index Analysis Types
export interface VegetationAnalysisRequest {
  rgb_file: File;
  swir_file: File;
  nir_file: File;
  acquisition_date: string;
  location?: string;
}

export interface VegetationIndex {
  max: number;
  mean: number;
  min: number;
  std: number;
}

export interface VegetationIndices {
  NDVI: VegetationIndex;
  NDMI: VegetationIndex;
  NDWI: VegetationIndex;
  MSAVI: VegetationIndex;
  CWSI: VegetationIndex;
  EVI: VegetationIndex;
}

export interface VegetationPlots {
  NDVI: string;
  NDMI: string;
  NDWI: string;
  MSAVI: string;
  CWSI: string;
  EVI: string;
  overview: string;
}

export interface VegetationAnalysisResponse {
  success: boolean;
  message: string;
  data: {
    session_id: string;
    acquisition_date: string;
    location: string;
    indices_calculated: string[];
    indices: VegetationIndices;
    plots: VegetationPlots;
  };
}

export interface VegetationReportRequest {
  session_id: string;
  report_title: string;
  farmer_name: string;
  field_size?: string;
  crop_type?: string;
  additional_notes?: string;
}

export interface VegetationReportResponse {
  success: boolean;
  message: string;
  data: {
    report_url: string;
    download_url: string;
  };
}


// Video Analysis Types
export interface VideoFile {
  filename: string;
  path: string;
  size_mb: number;
  modified: string;
  size_bytes?: number;
  type?: string;
}

export interface VideoListResponse {
  success: boolean;
  count: number;
  videos: VideoFile[];
}

export interface VideoAnalysisRequest {
  filename: string;
}

export interface VideoAnalysisResponse {
  success: boolean;
  status: string;
  message: string;
  session_id: string;
  filename: string;
}

export interface VideoResultMetrics {
  frames_processed: number;
  objects_detected: number;
  confidence: number;
  quality_score: number;
  detections_per_frame: number;
  process_time_seconds: number;
}

export interface VideoResultResponse {
  success: boolean;
  session_id: string;
  filename: string;
  status: string;
  started_at: string;
  completed_at: string;
  result_file: string;
  result_path: string;
  metrics: VideoResultMetrics;
}