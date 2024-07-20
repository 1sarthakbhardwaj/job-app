import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
import './JobDetailsPage.css';
import demoData from './Demo.json';

const JobDetailsPage = () => {
  const { state } = useLocation();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const foundJob = demoData.find(job => job['Job Id'] === parseInt(state.jobId) && job['Job Version'] === parseFloat(state.jobVersion));
    setJob(foundJob);
  }, [state]);

  return (
    <Container className="job-details-container mt-5">
      {job ? (
        <>
          <div className="job-title-container text-center mb-5">
            <h2 className="job-title">{job['Job Name']}</h2>
            {job.Status === 'Active' && <span className="status-indicator active"></span>}
          </div>
          <Row className="data-flow mb-5 justify-content-center align-items-center text-center">
            <Col md="auto" className="data-block">{job['Inboud System']}</Col>
            <Col md="auto" className="arrow">
              <span className="arrow-text">{job['Source Feed via MFT/API']}</span>
              <ArrowRight className="arrow-icon" />
            </Col>
            <Col md="auto" className="data-block">{job['Outbound System']}</Col>
          </Row>
          <Row className="job-details justify-content-center">
            {Object.keys(job).filter(key => 
              key !== 'Job Name' && 
              key !== 'Impact If not completed' &&
              key !== 'Next Job to be run/activity' &&
              key !== 'Comments' &&
              key !== 'Inboud System' &&
              key !== 'Outbound System' &&
              key !== 'Source Feed via MFT/API' &&
              key !== 'Status'
            ).map((key, index) => (
              <Col key={index} md={6} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{key}</Card.Title>
                    <Card.Text>
                      {Array.isArray(job[key])
                        ? <ul>{job[key].map((item, i) => <li key={i}>{item}</li>)}</ul>
                        : typeof job[key] === 'string' && job[key].includes('\n')
                          ? <ul>{job[key].split('\n').map((item, i) => <li key={i}>{item}</li>)}</ul>
                          : job[key]}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Card className="impact-card mt-5">
            <Card.Body className="text-center">
              <Card.Text className="impact-text">
                {job['Impact If not completed']}
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      ) : (
        <p>No job details found.</p>
      )}
      <div className="text-center mt-4">
        <Button variant="primary" as={Link} to="/">Back to Home</Button>
      </div>
    </Container>
  );
};

export default JobDetailsPage;
