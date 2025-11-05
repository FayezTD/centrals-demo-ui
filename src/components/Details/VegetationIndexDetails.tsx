import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const VegetationIndexDetails: React.FC = () => {
  return (
    <div className="specific-demo-details">
      <h5 className="mb-4">Vegetation Index Analytics Platform Overview</h5>
      
      <p className="lead">
        Monitor vegetation health and environmental changes using satellite-based remote sensing 
        and advanced analytics. Our platform provides comprehensive vegetation indices including 
        NDVI, EVI, SAVI, and more for agricultural and environmental applications.
      </p>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-satellite me-2 text-success"></i>Remote Sensing Features</h6>
              <ul>
                <li>Multi-spectral satellite data analysis</li>
                <li>NDVI, EVI, SAVI calculations</li>
                <li>Time-series vegetation monitoring</li>
                <li>Crop health assessment</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="info-card mb-3">
            <Card.Body>
              <h6><i className="fas fa-map me-2 text-success"></i>Geospatial Analytics</h6>
              <ul>
                <li>GIS integration and mapping</li>
                <li>Zonal statistics analysis</li>
                <li>Change detection algorithms</li>
                <li>Drought and stress monitoring</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h6 className="mt-4 mb-3">Application Areas</h6>
      <ul>
        <li><strong>Precision Agriculture:</strong> Optimize irrigation and fertilization</li>
        <li><strong>Environmental Monitoring:</strong> Track deforestation and land use changes</li>
        <li><strong>Climate Research:</strong> Study vegetation response to climate variations</li>
        <li><strong>Disaster Management:</strong> Assess drought and flood impacts</li>
      </ul>

      <h6 className="mt-4 mb-3">Data Sources & Technology</h6>
      <p>
        Leverages data from Sentinel-2, Landsat, and MODIS satellites with 10m to 30m resolution. 
        Cloud-based processing pipeline handles petabytes of satellite imagery. Advanced algorithms 
        correct for atmospheric effects, cloud cover, and seasonal variations to provide accurate 
        vegetation health metrics.
      </p>
    </div>
  );
};

export default VegetationIndexDetails;
