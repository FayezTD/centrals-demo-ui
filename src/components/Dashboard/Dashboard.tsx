/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import Header from './Header';
import DemoCard from './DemoCard';
import { DEMOS, DEMO_CATEGORIES } from '../../utils/constants';
import { Demo } from '../../types';

const Dashboard: React.FC = () => {
  const [demos] = useState<Demo[]>(DEMOS);
  const [filteredDemos, setFilteredDemos] = useState<Demo[]>(DEMOS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    filterDemos();
  }, [searchTerm, selectedCategory]);

  const filterDemos = () => {
    let filtered = [...demos];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (demo) =>
          demo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          demo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          demo.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((demo) => demo.category === selectedCategory);
    }

    setFilteredDemos(filtered);
  };

  const categories = ['All', ...Object.values(DEMO_CATEGORIES)];

  return (
    <div className="dashboard-page">
      <Header />
      
      <div className="dashboard-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="hero-title">
                <i className="fas fa-rocket me-3"></i>
                Explore AI Solutions
              </h1>
              <p className="hero-subtitle">
                Discover our comprehensive suite of artificial intelligence demonstrations 
                showcasing cutting-edge technology across various domains.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <div className="stats-box">
                <div className="stat-item">
                  <h3 className="stat-number">{demos.length}</h3>
                  <p className="stat-label">AI Solutions</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="dashboard-content">
        <Row className="mb-4">
          <Col lg={8}>
            <InputGroup className="search-box">
              <InputGroup.Text>
                <i className="fas fa-search"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search demos by name, technology, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col lg={4}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <div className="results-info mb-3">
          <p className="text-muted">
            <i className="fas fa-filter me-2"></i>
            Showing <strong>{filteredDemos.length}</strong> of <strong>{demos.length}</strong> demos
          </p>
        </div>

        <Row className="g-4">
          {filteredDemos.map((demo) => (
            <Col key={demo.id} lg={4} md={6}>
              <DemoCard demo={demo} />
            </Col>
          ))}
        </Row>

        {filteredDemos.length === 0 && (
          <div className="no-results text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h4>No demos found</h4>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </Container>

      <footer className="dashboard-footer mt-5">
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

export default Dashboard;
