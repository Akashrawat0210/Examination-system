import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/facultymap.css'

const FacultyMapping = () =>{
     const [facultyList, setFacultyList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch faculty list
    axios.get('http://localhost:5000/api/faculty')
      .then(response => {
        setFacultyList(response.data);
      })
      .catch(error => {
        setErrorMessage('Error fetching faculty list');
      });

    // Fetch subject list
    axios.get('http://localhost:5000/api/subjects')
      .then(response => {
        setSubjectList(response.data);
      })
      .catch(error => {
        setErrorMessage('Error fetching subject list');
      });

    // Fetch branch list
    axios.get('http://localhost:5000/api/branches')
      .then(response => {
        setBranchList(response.data);
      })
      .catch(error => {
        setErrorMessage('Error fetching branch list');
      });
  }, []);

  const handleAssignSubject = () => {
    if (selectedFaculty && selectedSubject && selectedBranch) {
      axios.post('http://localhost:5000/api/faculty/assign-subject', {
        facultyId: selectedFaculty,
        subjectId: selectedSubject,
        branchId: selectedBranch
      })
      .then(response => {
        setSuccessMessage('Subject assigned successfully');
      })
      .catch(error => {
        setErrorMessage('Error assigning subject');
      });
    } else {
      setErrorMessage('Please select faculty, subject, and branch');
    }
  };

  return (
    <div className="container">
      <h2>Subject-Teacher-Branch Mapping</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="mapping-form">
        <div className="form-group">
          <label>Select Subject:</label>
          <select onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="">Select Subject</option>
            {subjectList.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select Teacher:</label>
          <select onChange={(e) => setSelectedFaculty(e.target.value)}>
            <option value="">Select Teacher</option>
            {facultyList.map(faculty => (
              <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select Branch:</label>
          <select onChange={(e) => setSelectedBranch(e.target.value)}>
            <option value="">Select Branch</option>
            {branchList.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
        </div>
        <button onClick={handleAssignSubject}>Assign Subject</button>
      </div>
    </div>
  );
}

export default FacultyMapping;
