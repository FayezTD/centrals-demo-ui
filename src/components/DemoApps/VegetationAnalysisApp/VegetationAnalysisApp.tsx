/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, Badge, Table, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import apiService from '../../../services/apiService';
import { VegetationAnalysisResponse } from '../../../types';
import './VegetationAnalysisApp.css';
 
const VegetationAnalysisApp: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
 
  const rgbInputRef = useRef<HTMLInputElement>(null);
  const swirInputRef = useRef<HTMLInputElement>(null);
  const nirInputRef = useRef<HTMLInputElement>(null);
 
  const [rgbFile, setRgbFile] = useState<File | null>(null);
  const [swirFile, setSwirFile] = useState<File | null>(null);
  const [nirFile, setNirFile] = useState<File | null>(null);
  const [acquisitionDate, setAcquisitionDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
 
  const [result, setResult] = useState<VegetationAnalysisResponse['data'] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
 
  // Report form data
  const [reportTitle, setReportTitle] = useState('Vegetation Health Analysis Report');
  const [farmerName, setFarmerName] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [cropType, setCropType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
 
  const handleFileSelect = (type: 'rgb' | 'swir' | 'nir', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`📁 ${type.toUpperCase()} file selected:`, file.name);
<<<<<<< HEAD
     
=======
      
>>>>>>> 9a9e27ed08a95d7898b845a2603fdfae14172655
      // Validate file type (TIFF files)
      const validExtensions = ['.tif', '.tiff', '.TIF', '.TIFF'];
      const isValid = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext.toLowerCase()));
     
      if (!isValid) {
        setError(`Please select a valid TIFF file for ${type.toUpperCase()} band`);
        return;
      }
<<<<<<< HEAD
     
=======
      
>>>>>>> 9a9e27ed08a95d7898b845a2603fdfae14172655
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        setError('File size should be less than 100MB');
        return;
      }
 
      if (type === 'rgb') setRgbFile(file);
      else if (type === 'swir') setSwirFile(file);
      else if (type === 'nir') setNirFile(file);
     
      setError('');
    }
  };
 
  const handleProcessImages = async () => {
    if (!rgbFile || !swirFile || !nirFile) {
      setError('Please upload all three required images (RGB, SWIR, NIR)');
      return;
    }
   
    if (!acquisitionDate) {
      setError('Please select acquisition date');
      return;
    }
 
    setIsProcessing(true);
    setError('');
    setResult(null);
 
    try {
      console.log('🚀 Starting vegetation analysis...');
     
      const response: VegetationAnalysisResponse = await apiService.analyzeVegetation(
        rgbFile,
        swirFile,
        nirFile,
        acquisitionDate,
        location
      );
 
      console.log('✅ Analysis complete:', response);
 
      if (response.success && response.data) {
        setResult(response.data);
        setActiveTab('results');
      } else {
        setError(response.message || 'Analysis failed');
      }
    } catch (err: any) {
      console.error('❌ Analysis error:', err);
      setError(err.message || 'Failed to analyze images. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
 
  const handleGenerateReport = async () => {
    if (!result) {
      setError('No analysis results available. Please process images first.');
      return;
    }
 
    setIsGeneratingReport(true);
    setError('');
<<<<<<< HEAD
 
=======

>>>>>>> 9a9e27ed08a95d7898b845a2603fdfae14172655
    try {
      console.log('📄 Generating report...');
     
      const reportData = {
        session_id: result.session_id,
        report_title: reportTitle,
        farmer_name: farmerName,
        field_size: fieldSize,
        crop_type: cropType,
        additional_notes: additionalNotes,
      };
<<<<<<< HEAD
 
      const reportResponse = await apiService.generateAndDownloadVegetationReport(reportData);
 
=======

      const reportResponse = await apiService.generateVegetationReport(reportData);

>>>>>>> 9a9e27ed08a95d7898b845a2603fdfae14172655
      if (reportResponse.success) {
        // Download the report
        const blob = await apiService.downloadVegetationReport(result.session_id);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vegetation_report_${result.session_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
<<<<<<< HEAD
       
=======
        
>>>>>>> 9a9e27ed08a95d7898b845a2603fdfae14172655
 Alert( { variant: 'success', children: 'Report generated and downloaded successfully!' });
      } else {
        setError('Failed to generate report');
      }
    } catch (err: any) {
      console.error('❌ Report generation error:', err);
      setError(err.message || 'Failed to generate report.');
    } finally {
      setIsGeneratingReport(false);
    }
  };
 
  const handleReset = () => {
    setRgbFile(null);
    setSwirFile(null);
    setNirFile(null);
    setAcquisitionDate('');
    setLocation('');
    setResult(null);
    setError('');
    setActiveTab('upload');
   
    if (rgbInputRef.current) rgbInputRef.current.value = '';
    if (swirInputRef.current) swirInputRef.current.value = '';
    if (nirInputRef.current) nirInputRef.current.value = '';
  };
 
  const renderIndexCard = (indexName: string, data: any) => {
    const colors: any = {
      NDVI: 'success',
      NDMI: 'info',
      NDWI: 'primary',
      MSAVI: 'warning',
      CWSI: 'danger',
      EVI: 'secondary',
    };
 
    return (
      <Col lg={6} xl={4} className="mb-3" key={indexName}>
        <Card className="index-stat-card">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">{indexName}</h6>
              <Badge bg={colors[indexName] || 'primary'}>{indexName}</Badge>
            </div>
            <Table size="sm" className="mb-0">
              <tbody>
                <tr>
                  <td><strong>Mean:</strong></td>
                  <td>{data.mean.toFixed(4)}</td>
                </tr>
                <tr>
                  <td><strong>Max:</strong></td>
                  <td>{data.max.toFixed(4)}</td>
                </tr>
                <tr>
                  <td><strong>Min:</strong></td>
                  <td>{data.min.toFixed(4)}</td>
                </tr>
                <tr>
                  <td><strong>Std Dev:</strong></td>
                  <td>{data.std.toFixed(4)}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    );
  };
 
  return (
    <div className="vegetation-analysis-app">
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
                <span className="veg-icon">🛰️</span>
                Vegetation Health Analysis System
              </h1>
              <p className="app-subtitle">
                Satellite Imagery Analysis for Precision Agriculture
              </p>
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
                <div className="app-banner mb-4">
                  <h5>
                    <i className="fas fa-info-circle me-2"></i>
                    About This System
                  </h5>
                  <p className="mb-0">
                    Upload Sentinel-2 satellite images to calculate various vegetation indices like NDVI, NDMI, NDWI,
                    MSAVI, CWSI, and EVI to assess crop health, moisture levels, and stress conditions.
                  </p>
                </div>
 
                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    <i className="fas fa-exclamation-circle me-2"></i>
                    <strong>Error:</strong> {error}
                  </Alert>
                )}
<<<<<<< HEAD
 
=======

>>>>>>> 9a9e27ed08a95d7898b845a2603fdfae14172655
                <Tabs activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)} className="mb-4 custom-tabs">
                  {/* Tab 1: Upload & Process */}
                  <Tab eventKey="upload" title={<><i className="fas fa-cloud-upload-alt me-2"></i>Upload & Process Images</>}>
                    <div className="tab-content-wrapper p-4">
                      <Row>
                        <Col lg={8}>
                          <h5 className="mb-4">
                            <i className="fas fa-file-upload me-2"></i>
                            Upload Satellite Images
                          </h5>
                         
                          <p className="text-muted mb-4">
                            Please upload three Sentinel-2 satellite images in the following order:
                          </p>
 
                          {/* RGB File Upload */}
                          <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">
                              <Badge bg="success" className="me-2">1</Badge>
                              RGB Image (True Color - 3-band image containing Red, Green, Blue bands)
                            </Form.Label>
                            <div className="file-upload-area" onClick={() => rgbInputRef.current?.click()}>
                              {rgbFile ? (
                                <div className="file-selected">
                                  <i className="fas fa-check-circle text-success me-2"></i>
                                  <span>{rgbFile.name}</span>
                                  <Badge bg="secondary" className="ms-2">
                                    {(rgbFile.size / (1024 * 1024)).toFixed(2)} MB
                                  </Badge>
                                </div>
                              ) : (
                                <div className="file-placeholder">
                                  <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                                  <p className="mb-1">Click to upload RGB image</p>
                                  <small className="text-muted">TIFF format • Max 100MB</small>
                                </div>
                              )}
                              <input
                                ref={rgbInputRef}
                                type="file"
                                accept=".tif,.tiff,.TIF,.TIFF"
                                onChange={(e) => handleFileSelect('rgb', e)}
                                style={{ display: 'none' }}
                              />
                            </div>
                          </Form.Group>
 
                          {/* SWIR File Upload */}
                          <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">
                              <Badge bg="warning" text="dark" className="me-2">2</Badge>
                              SWIR Band (Single-band Short-Wave Infrared image)
                            </Form.Label>
                            <div className="file-upload-area" onClick={() => swirInputRef.current?.click()}>
                              {swirFile ? (
                                <div className="file-selected">
                                  <i className="fas fa-check-circle text-success me-2"></i>
                                  <span>{swirFile.name}</span>
                                  <Badge bg="secondary" className="ms-2">
                                    {(swirFile.size / (1024 * 1024)).toFixed(2)} MB
                                  </Badge>
                                </div>
                              ) : (
                                <div className="file-placeholder">
                                  <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                                  <p className="mb-1">Click to upload SWIR image</p>
                                  <small className="text-muted">TIFF format • Max 100MB</small>
                                </div>
                              )}
                              <input
                                ref={swirInputRef}
                                type="file"
                                accept=".tif,.tiff,.TIF,.TIFF"
                                onChange={(e) => handleFileSelect('swir', e)}
                                style={{ display: 'none' }}
                              />
                            </div>
                          </Form.Group>
 
                          {/* NIR File Upload */}
                          <Form.Group className="mb-4">
                            <Form.Label className="fw-bold">
                              <Badge bg="info" className="me-2">3</Badge>
                              NIR Band (Single-band Near-Infrared image)
                            </Form.Label>
                            <div className="file-upload-area" onClick={() => nirInputRef.current?.click()}>
                              {nirFile ? (
                                <div className="file-selected">
                                  <i className="fas fa-check-circle text-success me-2"></i>
                                  <span>{nirFile.name}</span>
                                  <Badge bg="secondary" className="ms-2">
                                    {(nirFile.size / (1024 * 1024)).toFixed(2)} MB
                                  </Badge>
                                </div>
                              ) : (
                                <div className="file-placeholder">
                                  <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                                  <p className="mb-1">Click to upload NIR image</p>
                                  <small className="text-muted">TIFF format • Max 100MB</small>
                                </div>
                              )}
                              <input
                                ref={nirInputRef}
                                type="file"
                                accept=".tif,.tiff,.TIF,.TIFF"
                                onChange={(e) => handleFileSelect('nir', e)}
                                style={{ display: 'none' }}
                              />
                            </div>
                          </Form.Group>
                        </Col>
 
                        <Col lg={4}>
                          <Card className="parameters-card">
                            <Card.Body>
                              <h6 className="mb-3">
                                <i className="fas fa-cog me-2"></i>
                                Image Parameters
                              </h6>
 
                              <Form.Group className="mb-3">
                                <Form.Label>Image Acquisition Date *</Form.Label>
                                <Form.Control
                                  type="date"
                                  value={acquisitionDate}
                                  onChange={(e) => setAcquisitionDate(e.target.value)}
                                  max={new Date().toISOString().split('T')[0]}
                                  required
                                />
                                <Form.Text>Format: YYYY-MM-DD</Form.Text>
                              </Form.Group>
 
                              <Form.Group className="mb-4">
                                <Form.Label>Field/Location Name (Optional)</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="e.g., North Field A"
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
                                />
                              </Form.Group>
 
                              <div className="d-grid gap-2">
                                <Button
                                  variant="success"
                                  size="lg"
                                  onClick={handleProcessImages}
                                  disabled={!rgbFile || !swirFile || !nirFile || !acquisitionDate || isProcessing}
                                >
                                  {isProcessing ? (
                                    <>
                                      <Spinner animation="border" size="sm" className="me-2" />
                                      Processing Images...
                                    </>
                                  ) : (
                                    <>
                                      <i className="fas fa-play me-2"></i>
                                      Process Images
                                    </>
                                  )}
                                </Button>
                                <Button
                                  variant="outline-secondary"
                                  onClick={handleReset}
                                  disabled={isProcessing}
                                >
                                  <i className="fas fa-redo me-2"></i>
                                  Reset
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Tab>
 
                  {/* Tab 2: View Results */}
                  <Tab
                    eventKey="results"
                    title={<><i className="fas fa-chart-line me-2"></i>View Results</>}
                    disabled={!result}
                  >
                    <div className="tab-content-wrapper p-4">
                      {result ? (
                        <>
                          <div className="results-header mb-4">
                            <Row className="align-items-center">
                              <Col>
                                <h5 className="mb-2">
                                  <i className="fas fa-check-circle text-success me-2"></i>
                                  Analysis Complete!
                                </h5>
                                <p className="text-muted mb-0">
                                  Calculated {result.indices_calculated.length} vegetation indices for {result.location || 'your field'}
                                </p>
                              </Col>
                              <Col xs="auto">
                                <Badge bg="info" className="p-2">
                                  Session: {result.session_id}
                                </Badge>
                              </Col>
                            </Row>
                          </div>
 
                          {/* Overview Plot */}
                          <Card className="mb-4">
                            <Card.Header>
                              <h6 className="mb-0">
                                <i className="fas fa-image me-2"></i>
                                Overview of All Indices
                              </h6>
                            </Card.Header>
                            <Card.Body className="p-2">
                              <img
                                src={`${apiService['baseURL']}${result.plots.overview}`}
                                alt="All Vegetation Indices"
                                className="w-100"
                                style={{ maxHeight: '600px', objectFit: 'contain' }}
                              />
                            </Card.Body>
                          </Card>
 
                          {/* Individual Index Statistics */}
                          <h6 className="mb-3">
                            <i className="fas fa-chart-bar me-2"></i>
                            Index Statistics
                          </h6>
                          <Row>
                            {Object.entries(result.indices).map(([key, value]) =>
                              renderIndexCard(key, value)
                            )}
                          </Row>
 
                          {/* Individual Plots in 3x2 Grid */}
                          <h6 className="mb-3 mt-4">
                            <i className="fas fa-th me-2"></i>
                            Individual Index Plots
                          </h6>
                          <Row>
                            {result.indices_calculated.map((indexName) => (
                              <Col lg={4} md={6} className="mb-3" key={indexName}>
                                <Card>
                                  <Card.Header>
                                    <Badge bg="primary">{indexName}</Badge>
                                  </Card.Header>
                                  <Card.Body className="p-2">
                                    <img
                                      src={`${apiService['baseURL']}${result.plots[indexName as keyof typeof result.plots]}`}
                                      alt={`${indexName} Plot`}
                                      className="w-100"
                                    />
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </>
                      ) : (
                        <div className="text-center py-5">
                          <i className="fas fa-chart-line fa-3x text-muted mb-3"></i>
                          <p className="text-muted">No results yet. Please process images first.</p>
                        </div>
                      )}
                    </div>
                  </Tab>
 
                  {/* Tab 3: Download Report */}
                  <Tab
                    eventKey="report"
                    title={<><i className="fas fa-file-pdf me-2"></i>Download Report</>}
                    disabled={!result}
                  >
                    <div className="tab-content-wrapper p-4">
                      {result ? (
                        <Row>
                          <Col lg={8}>
                            <h5 className="mb-4">
                              <i className="fas fa-file-alt me-2"></i>
                              Generate and Download Report
                            </h5>
 
                            <Form>
                              <Form.Group className="mb-3">
                                <Form.Label>Report Title</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={reportTitle}
                                  onChange={(e) => setReportTitle(e.target.value)}
                                />
                              </Form.Group>
 
                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Farmer/Client Name (Optional)</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="John Doe"
                                      value={farmerName}
                                      onChange={(e) => setFarmerName(e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Field Size (Optional)</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="25 acres"
                                      value={fieldSize}
                                      onChange={(e) => setFieldSize(e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
 
                              <Form.Group className="mb-3">
                                <Form.Label>Crop Type (Optional)</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Wheat, Rice, etc."
                                  value={cropType}
                                  onChange={(e) => setCropType(e.target.value)}
                                />
                              </Form.Group>
 
                              <Form.Group className="mb-4">
                                <Form.Label>Additional Notes (Optional)</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={4}
                                  placeholder="Add any additional observations or notes..."
                                  value={additionalNotes}
                                  onChange={(e) => setAdditionalNotes(e.target.value)}
                                />
                              </Form.Group>
 
                              <Button
                                variant="primary"
                                size="lg"
                                onClick={handleGenerateReport}
                                disabled={isGeneratingReport}
                              >
                                {isGeneratingReport ? (
                                  <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Generating Report...
                                  </>
                                ) : (
                                  <>
                                    <i className="fas fa-file-download me-2"></i>
                                    Generate Report
                                  </>
                                )}
                              </Button>
                            </Form>
                          </Col>
 
                          <Col lg={4}>
                            <Card className="info-card">
                              <Card.Body>
                                <h6 className="mb-3">
                                  <i className="fas fa-info-circle me-2"></i>
                                  Report Information
                                </h6>
                                <ul className="info-list">
                                  <li>Comprehensive PDF report with all vegetation indices</li>
                                  <li>Visual plots and statistical analysis</li>
                                  <li>Actionable recommendations</li>
                                  <li>Professional formatting for client presentation</li>
                                </ul>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      ) : (
                        <div className="text-center py-5">
                          <i className="fas fa-file-pdf fa-3x text-muted mb-3"></i>
                          <p className="text-muted">No results available. Please process images first.</p>
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
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
 
export default VegetationAnalysisApp;