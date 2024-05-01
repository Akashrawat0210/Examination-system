import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/teacherselection.css';

function TeacherSelection() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch branches from the database
    axios.get('http://localhost:5000/api/branches')
      .then(response => {
        setBranches(response.data);
      })
      .catch(error => {
        console.error('Error fetching branches:', error);
      });
  }, []);

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
    // Fetch subjects for the selected branch from the database
    axios.get(`http://localhost:5000/api/subjects?branch=${e.target.value}`)
      .then(response => {
        setSubjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
      });
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleSubmit = () => {
    // Navigate to marks entry excel page when submit button is clicked
    navigate('/teacher/marks-entry-excel');
  };

  return (
    <div className="teacher-selection-container">
      <h2>Select Branch and Subject</h2>
      <div className="selection-form">
        <div className="form-group">
          <label htmlFor="branch">Select Branch:</label>
          <select id="branch" value={selectedBranch} onChange={handleBranchChange}>
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch._id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        {selectedBranch && (
          <div className="form-group">
            <label htmlFor="subject">Select Subject:</label>
            <select id="subject" value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject._id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="button-container">
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default TeacherSelection;
