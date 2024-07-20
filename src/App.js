import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import JobDetailsPage from './JobDetailsPage';
import Layout from './Layout';
import jobData from './Demo.json'; // Import your JSON file

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage jobData={jobData} />} />
          <Route path="/details" element={<JobDetailsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
