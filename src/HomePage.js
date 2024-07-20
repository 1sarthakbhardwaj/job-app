import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './HomePage.css'; // Import custom CSS

function HomePage({ jobData }) {
  const [selectedJobId, setSelectedJobId] = useState('');
  const [selectedJobVersion, setSelectedJobVersion] = useState('');
  const [jobVersions, setJobVersions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedJobId) {
      const versions = jobData
        .filter(job => job["Job Id"] === Number(selectedJobId))
        .map(job => job["Job Version"]);
      setJobVersions(versions);
      setSelectedJobVersion(''); // Reset version when job ID changes
    }
  }, [selectedJobId, jobData]);

  const handleSubmit = () => {
    if (selectedJobId && selectedJobVersion) {
      navigate('/details', { state: { jobId: Number(selectedJobId), jobVersion: Number(selectedJobVersion), jobData } });
    }
  };

  const jobIds = [...new Set(jobData.map(job => job["Job Id"]))];

  return (
    <Container className="home-page">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Select Job</h1>
          <Form>
            <Form.Group controlId="jobId">
              <Form.Label>Job ID:</Form.Label>
              <Form.Control as="select" value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)}>
                <option value="">Select Job ID</option>
                {jobIds.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="jobVersion">
              <Form.Label>Job Version:</Form.Label>
              <Form.Control as="select" value={selectedJobVersion} onChange={(e) => setSelectedJobVersion(e.target.value)} disabled={!selectedJobId}>
                <option value="">Select Job Version</option>
                {jobVersions.map(version => (
                  <option key={version} value={version}>{version}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button className="submit-button" onClick={handleSubmit} disabled={!selectedJobId || !selectedJobVersion}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
