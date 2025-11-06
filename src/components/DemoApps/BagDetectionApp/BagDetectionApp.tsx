/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, Badge, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import apiService from '../../../services/apiService';
import { BagDetectionResponse } from '../../../types';
import './BagDetectionApp.css';

const BagDetectionApp: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.3);
  const [result, setResult] = useState<BagDetectionResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('📁 File selected:', file.name, 'Type:', file.type, 'Size:', file.size);
      
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG, GIF, BMP)');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size should be less than 10MB');
        return;
      }

      setSelectedImage(file);
      setError('');
      setResult(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please upload an image first');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('🚀 Starting bag detection...');
      console.log('📸 Selected file:', {
        name: selectedImage.name,
        type: selectedImage.type,
        size: selectedImage.size,
        lastModified: new Date(selectedImage.lastModified)
      });
      console.log('🎯 Confidence threshold:', confidenceThreshold);
      
      const response: BagDetectionResponse = await apiService.detectBags(
        selectedImage,
        confidenceThreshold
      );

      console.log('✅ Detection response:', response);

      if (response.success && response.data) {
        setResult(response.data);
      } else {
        setError(response.message || 'Detection failed');
      }
    } catch (err: any) {
      console.error('❌ Detection error:', err);
      console.error('Error details:', err.details);
      
      let errorMessage = 'Failed to analyze image. ';
      if (err.code === 'NETWORK_ERROR') {
        errorMessage += 'Cannot connect to server. Please ensure the backend is running.';
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview('');
    setResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bag-detection-app">
      {/* Header */}
      <div className="app-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col lg={2} md={2}>
              <img 
                src="https://thirdeyedata.ai/wp-content/uploads/2023/06/ThirdEye-Data-Logo.png" 
                alt="ThirdEye Data Logo" 
                className="app-logo"
              />
            </Col>
            <Col lg={8} md={7}>
              <h1 className="app-title">
                <span className="bag-icon">📦</span>
                Image Detection
              </h1>
              <p className="app-subtitle">AI-Powered Bag & Product Counting System</p>
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
      <Container fluid className="app-content">
        <Row className="justify-content-center">
          <Col xl={11}>
            <Card className="main-card">
              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    <i className="fas fa-exclamation-circle me-2"></i>
                    <strong>Error:</strong> {error}
                  </Alert>
                )}

                <Row>
                  {/* Left Column - Image Upload & Settings */}
                  <Col lg={6}>
                    <div className="upload-section">
                      <h5 className="section-title">
                        <i className="fas fa-cloud-upload-alt me-2"></i>
                        Image Detection
                      </h5>

                      <div className="upload-area" onClick={handleUploadClick}>
                        {imagePreview ? (
                          <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                            <div className="preview-overlay">
                              <i className="fas fa-sync-alt"></i>
                              <p>Click to change image</p>
                            </div>
                          </div>
                        ) : (
                          <div className="upload-placeholder">
                            <i className="fas fa-cloud-upload-alt fa-3x mb-3"></i>
                            <h6>Upload Image</h6>
                            <p className="text-muted">Click or drag image here</p>
                            <Badge bg="secondary">JPG, PNG, GIF, BMP • Max 10MB</Badge>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/bmp"
                          onChange={handleImageSelect}
                          style={{ display: 'none' }}
                        />
                      </div>

                      {selectedImage && (
                        <div className="file-info mt-3">
                          <i className="fas fa-file-image me-2 text-primary"></i>
                          <span className="file-name">{selectedImage.name}</span>
                          <span className="file-size ms-2 text-muted">
                            ({(selectedImage.size / 1024).toFixed(2)} KB)
                          </span>
                        </div>
                      )}

                      <div className="threshold-section mt-4">
                        <Form.Label>
                          <i className="fas fa-sliders-h me-2"></i>
                          Confidence Threshold: <strong>{confidenceThreshold.toFixed(1)}</strong>
                        </Form.Label>
                        <Form.Range
                          value={confidenceThreshold}
                          onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                          min={0.1}
                          max={0.9}
                          step={0.1}
                          disabled={isLoading}
                        />
                        <div className="d-flex justify-content-between small text-muted">
                          <span>0.1 (More detections)</span>
                          <span>0.9 (Higher confidence)</span>
                        </div>
                      </div>

                      <div className="action-buttons mt-4">
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={handleAnalyze}
                          disabled={!selectedImage || isLoading}
                          className="analyze-btn w-100 mb-2"
                        >
                          {isLoading ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              Analyzing Image...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-search me-2"></i>
                              Analyze Image
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={handleReset}
                          className="w-100"
                          disabled={isLoading}
                        >
                          <i className="fas fa-redo me-2"></i>
                          Reset
                        </Button>
                      </div>
                    </div>

                    {/* Original Image Display */}
                    {imagePreview && (
                      <div className="original-image-section mt-4">
                        <h6 className="mb-3">
                          <i className="fas fa-image me-2"></i>
                          Original Image
                        </h6>
                        <Card className="image-card">
                          <Card.Body className="p-2">
                            <img src={imagePreview} alt="Original" className="w-100" />
                          </Card.Body>
                        </Card>
                      </div>
                    )}
                  </Col>

                  {/* Right Column - Results */}
                  <Col lg={6}>
                    <div className="results-section">
                      <h5 className="section-title">
                        <i className="fas fa-chart-bar me-2"></i>
                        Analyzed Image
                      </h5>

                      {result ? (
                        <div className="results-content">
                          {/* Annotated Image */}
                          <Card className="result-image-card mb-4">
                            <Card.Body className="p-2">
                              <img
                                src={`data:image/jpeg;base64,${result.annotated_image}`}
                                alt="Annotated"
                                className="w-100"
                              />
                            </Card.Body>
                          </Card>

                          {/* Detection Summary */}
                          <Card className="summary-card mb-3">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="mb-0">
                                  <i className="fas fa-check-circle text-success me-2"></i>
                                  Detection Complete
                                </h6>
                                <Badge bg="success" className="count-badge">
                                  {result.total_count} Bags Detected
                                </Badge>
                              </div>

                              <div className="info-row">
                                <span className="info-label">Model Used:</span>
                                <span className="info-value">{result.model_used}</span>
                              </div>
                              <div className="info-row">
                                <span className="info-label">Confidence Threshold:</span>
                                <span className="info-value">{result.confidence_threshold}</span>
                              </div>
                              <div className="info-row">
                                <span className="info-label">Timestamp:</span>
                                <span className="info-value">
                                  {new Date(result.timestamp).toLocaleString()}
                                </span>
                              </div>
                            </Card.Body>
                          </Card>

                          {/* Detections Table */}
                          <h6 className="mb-3">
                            <i className="fas fa-list me-2"></i>
                            Detections
                          </h6>
                          <Card className="detections-card">
                            <Card.Body className="p-0">
                              <Table striped bordered hover size="sm" className="mb-0">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>Class</th>
                                    <th>Confidence</th>
                                    <th>Area</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {result.detections.map((detection) => (
                                    <tr key={detection.id}>
                                      <td>{detection.id + 1}</td>
                                      <td>
                                        <Badge bg="primary">{detection.class}</Badge>
                                      </td>
                                      <td>
                                        <Badge bg="success">
                                          {(detection.confidence * 100).toFixed(1)}%
                                        </Badge>
                                      </td>
                                      <td>{detection.area.toFixed(0)} px²</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Card.Body>
                          </Card>
                        </div>
                      ) : (
                        <div className="no-results">
                          <i className="fas fa-image fa-3x text-muted mb-3"></i>
                          <p className="text-muted">
                            {isLoading
                              ? 'Analyzing image...'
                              : 'Upload and analyze an image to see results'}
                          </p>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="app-footer">
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

export default BagDetectionApp;