/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Alert, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiService from '../../../services/apiService';
import { VideoFile, VideoAnalysisResponse, VideoResultResponse } from '../../../types';
import './visionAnalyticsApp.css';

const VisionAnalyticsApp: React.FC = () => {
  const navigate = useNavigate();
  
  const [mediaVideos, setMediaVideos] = useState<VideoFile[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [analysisResult, setAnalysisResult] = useState<VideoResultResponse | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    loadMediaVideos();
    
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, []);

  const loadMediaVideos = async () => {
    try {
      setIsLoadingVideos(true);
      setError('');
      
      const response = await apiService.getMediaVideos();
      
      if (response.success && response.videos) {
        const uniqueVideos = response.videos.filter((video: VideoFile, index: number, self: VideoFile[]) =>
          index === self.findIndex((v) => v.filename === video.filename)
        );
        setMediaVideos(uniqueVideos);
      }
    } catch (err: any) {
      setError('Failed to load videos. Please try again.');
    } finally {
      setIsLoadingVideos(false);
    }
  };

  const handleVideoSelect = (video: VideoFile) => {
    setSelectedVideo(video);
    setAnalysisResult(null);
    setError('');
    setSuccess(`Selected: ${video.filename}`);
  };

  const handleRunPrediction = async () => {
    if (!selectedVideo) {
      setError('Please select a video first');
      return;
    }

    setIsProcessing(true);
    setError('');
    setSuccess('');
    setAnalysisResult(null);
    setPollCount(0);

    try {
      const response: VideoAnalysisResponse = await apiService.analyzeVideo(selectedVideo.filename);
      
      if (response.success && response.session_id) {
        setSessionId(response.session_id);
        setSuccess('Video analysis started! Processing...');
        startPollingForResults(response.session_id);
      } else {
        setError('Failed to start analysis');
        setIsProcessing(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to analyze video. Please try again.');
      setIsProcessing(false);
    }
  };

  const startPollingForResults = (sid: string) => {
    const interval = setInterval(async () => {
      setPollCount(prev => {
        const newCount = prev + 1;
        
        // Stop polling after 30 attempts (60 seconds)
        if (newCount > 30) {
          clearInterval(interval);
          setPollingInterval(null);
          setIsProcessing(false);
          setError('Analysis is taking longer than expected. Please try again or check backend logs.');
          return newCount;
        }
        
        return newCount;
      });

      try {
        const result: VideoResultResponse = await apiService.getAnalysisResult(sid);
        
        if (result.success && result.status === 'completed') {
          setAnalysisResult(result);
          setIsProcessing(false);
          setSuccess('Analysis completed successfully!');
          clearInterval(interval);
          setPollingInterval(null);
        } else if (result.status === 'failed') {
          setError('Analysis failed. Please try again.');
          setIsProcessing(false);
          clearInterval(interval);
          setPollingInterval(null);
        }
        // If status is 'processing' or error occurred, continue polling
      } catch (err: any) {
        // Silently continue polling - errors are expected while processing
        // Only log errors that are NOT "Analysis not completed yet" or 400 errors
        if (!err.message?.includes('not completed') && err.code !== '400') {
          console.error('Polling error:', err);
        }
      }
    }, 2000); // Poll every 2 seconds
    
    setPollingInterval(interval);
  };

  const handleDownloadResult = () => {
    if (analysisResult) {
      const downloadUrl = apiService.getVideoDownloadUrl(analysisResult.result_file);
      window.open(downloadUrl, '_blank');
    }
  };

  const getVideoStreamUrl = (path: string): string => {
    // Handle Windows backslashes
    const normalizedPath = path.replace(/\\/g, '/');
    // Remove 'static/' prefix if present
    const cleanPath = normalizedPath.replace(/^static\//, '');
    // Construct proper URL
    return `${apiService.baseURL}/${cleanPath}`;
  };

  return (
    <div className="vision-analytics-app">
      {/* Header */}
      <div className="app-header-gradient">
        <Container>
          <Row className="align-items-center py-4">
            <Col lg={2} md={2}>
              <img 
                src="https://thirdeyedata.ai/wp-content/uploads/2023/06/ThirdEye-Data-Logo.png" 
                alt="ThirdEye Data Logo" 
                className="app-logo"
              />
            </Col>
            <Col lg={8} md={7}>
              <div className="d-flex align-items-center">
                <span className="app-icon me-3">🎯</span>
                <div>
                  <h1 className="app-title-white mb-1">Object Detection & Quality Analysis</h1>
                  <p className="app-subtitle-white mb-0">Advanced AI-Powered Video Analysis Platform</p>
                </div>
              </div>
            </Col>
            <Col lg={2} md={3} className="text-end">
              <Button variant="outline-light" onClick={() => navigate('/dashboard')} size="sm">
                <i className="fas fa-home me-2"></i>
                Back
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid className="app-content-gray py-5">
        <Row className="justify-content-center">
          <Col xl={11}>
            {error && (
              <Alert variant="danger" dismissible onClose={() => setError('')}>
                <i className="fas fa-exclamation-circle me-2"></i>
                <strong>Error:</strong> {error}
              </Alert>
            )}

            {success && (
              <Alert variant="success" dismissible onClose={() => setSuccess('')}>
                <i className="fas fa-check-circle me-2"></i>
                <strong>Success:</strong> {success}
              </Alert>
            )}

            {/* Video Selection Section */}
            <Card className="selection-card mb-4">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <span className="section-icon">📁</span>
                  <h5 className="mb-0 ms-2">Select Video for Analysis</h5>
                </div>

                {selectedVideo && (
                  <Alert variant="success" className="selected-video-alert">
                    <strong>Selected:</strong> {selectedVideo.filename}
                  </Alert>
                )}

                {isLoadingVideos ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Loading available videos...</p>
                  </div>
                ) : (
                  <Row className="g-3">
                    {mediaVideos.map((video, index) => (
                      <Col key={`${video.filename}-${index}`} lg={4} md={6}>
                        <Card 
                          className={`video-card ${selectedVideo?.filename === video.filename ? 'selected' : ''}`}
                          onClick={() => handleVideoSelect(video)}
                        >
                          {selectedVideo?.filename === video.filename && (
                            <div className="selected-badge">
                              <i className="fas fa-check-circle"></i> Selected
                            </div>
                          )}
                          <Card.Body>
                            <div className="video-icon-wrapper">
                              <i className="fas fa-video video-icon"></i>
                            </div>
                            <h6 className="video-filename">{video.filename}</h6>
                            <div className="video-meta">
                              <Badge bg="secondary">{video.size_mb} MB</Badge>
                            </div>
                            <video 
                              src={getVideoStreamUrl(video.path)} 
                              className="video-thumbnail"
                              muted
                              preload="metadata"
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}

                <div className="text-center mt-4">
                  <Button
                    variant="success"
                    size="lg"
                    className="run-prediction-btn"
                    onClick={handleRunPrediction}
                    disabled={!selectedVideo || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing... ({pollCount * 2}s)
                      </>
                    ) : (
                      <>
                        <i className="fas fa-play me-2"></i>
                        Run Prediction
                      </>
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Results Section */}
            {(isProcessing || analysisResult) && (
              <Card className="results-card">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-4">
                    <span className="section-icon">📊</span>
                    <h5 className="mb-0 ms-2">Input vs Output Comparison</h5>
                  </div>

                  <Row>
                    {/* Input Video */}
                    <Col lg={6}>
                      <Card className="video-display-card">
                        <Card.Header className="video-header">
                          <i className="fas fa-upload text-primary me-2"></i>
                          INPUT VIDEO
                        </Card.Header>
                        <Card.Body>
                          {selectedVideo && (
                            <>
                              <p className="mb-2"><strong>File:</strong> {selectedVideo.filename}</p>
                              <p className="mb-3"><strong>Size:</strong> {selectedVideo.size_mb} MB</p>
                              <video 
                                src={getVideoStreamUrl(selectedVideo.path)} 
                                controls
                                className="w-100"
                                style={{ maxHeight: '400px', borderRadius: '8px' }}
                              />
                            </>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>

                    {/* Output Video */}
                    <Col lg={6}>
                      <Card className="video-display-card">
                        <Card.Header className="video-header">
                          <i className="fas fa-download text-success me-2"></i>
                          OUTPUT VIDEO
                        </Card.Header>
                        <Card.Body>
                          {isProcessing && !analysisResult && (
                            <div className="text-center py-5">
                              <Spinner animation="border" variant="success" size="lg" />
                              <p className="mt-3 text-muted">Analyzing video...</p>
                              <p className="small text-muted">Elapsed: {pollCount * 2} seconds</p>
                            </div>
                          )}

                          {analysisResult && (
                            <>
                              <div className="result-header mb-3">
                                <Badge bg="danger" className="me-2">
                                  Frame: 1 | Total: {analysisResult.metrics.objects_detected}
                                </Badge>
                                <Badge bg="warning" text="dark" className="me-2">
                                  Objects: {analysisResult.metrics.objects_detected}
                                </Badge>
                                <Badge bg="success" className="me-2">
                                  Conf: {analysisResult.metrics.confidence.toFixed(1)}%
                                </Badge>
                              </div>

                              <p className="mb-2"><strong>File:</strong> {analysisResult.result_file}</p>
                              <p className="mb-3"><strong>Status:</strong> <Badge bg="success">Completed</Badge></p>

                              <video 
                                src={getVideoStreamUrl(`result/${analysisResult.result_file}`)} 
                                controls
                                autoPlay
                                className="w-100"
                                style={{ maxHeight: '400px', borderRadius: '8px' }}
                              />

                              <div className="mt-3 text-center">
                                <Button variant="primary" onClick={handleDownloadResult}>
                                  <i className="fas fa-download me-2"></i>
                                  Download Result
                                </Button>
                              </div>
                            </>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* Metrics */}
                  {analysisResult && (
                    <Row className="mt-4">
                      <Col>
                        <Card className="metrics-card">
                          <Card.Header>
                            <h6 className="mb-0">
                              <i className="fas fa-chart-bar me-2"></i>
                              Analysis Metrics
                            </h6>
                          </Card.Header>
                          <Card.Body>
                            <Row>
                              <Col md={4} className="mb-3">
                                <div className="metric-box">
                                  <div className="metric-value">{analysisResult.metrics.frames_processed}</div>
                                  <div className="metric-label">Frames Processed</div>
                                </div>
                              </Col>
                              <Col md={4} className="mb-3">
                                <div className="metric-box">
                                  <div className="metric-value">{analysisResult.metrics.objects_detected}</div>
                                  <div className="metric-label">Objects Detected</div>
                                </div>
                              </Col>
                              <Col md={4} className="mb-3">
                                <div className="metric-box">
                                  <div className="metric-value">{analysisResult.metrics.confidence.toFixed(1)}%</div>
                                  <div className="metric-label">Confidence</div>
                                </div>
                              </Col>
                              <Col md={4} className="mb-3">
                                <div className="metric-box">
                                  <div className="metric-value">{analysisResult.metrics.quality_score.toFixed(1)}%</div>
                                  <div className="metric-label">Quality Score</div>
                                </div>
                              </Col>
                              <Col md={4} className="mb-3">
                                <div className="metric-box">
                                  <div className="metric-value">{analysisResult.metrics.detections_per_frame.toFixed(2)}</div>
                                  <div className="metric-label">Detections/Frame</div>
                                </div>
                              </Col>
                              <Col md={4} className="mb-3">
                                <div className="metric-box">
                                  <div className="metric-value">{analysisResult.metrics.process_time_seconds.toFixed(1)}s</div>
                                  <div className="metric-label">Process Time</div>
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="app-footer-dark">
        <Container>
          <Row>
            <Col className="text-center">
              <p className="mb-0">© 2025 ThirdEye Data AI Solutions. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default VisionAnalyticsApp;

