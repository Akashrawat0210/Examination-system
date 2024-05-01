import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/teacherdashboard.css'

const TeacherDashboard= ()  => {
  const [subjects, setSubjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch subjects assigned to the teacher
    axios.get('http://localhost:5000/api/teacher/subjects')
      .then(response => {
        setSubjects(response.data);
      })
      .catch(error => {
        setErrorMessage('Error fetching subjects');
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h2>My Subjects</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ul>
        {subjects.map(subject => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard;
