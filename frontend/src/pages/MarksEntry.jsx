import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/marksentry.css';

const MarksEntry=()=> {
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch list of students and their existing marks
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
        // Initialize marksData with existing marks or default values
        const initialMarks = response.data.map(student => ({
          studentId: student.id,
          internal: '',
          external: ''
        }));
        setMarksData(initialMarks);
      })
      .catch(error => {
        setErrorMessage('Error fetching student list');
      });

    // Fetch year and branch information
    axios.get('http://localhost:5000/api/branch-year')
      .then(response => {
        setYear(response.data.year);
        setBranch(response.data.branch);
      })
      .catch(error => {
        setErrorMessage('Error fetching year and branch information');
      });
  }, []);

  const handleInputChange = (studentId, type, value) => {
    const updatedMarks = marksData.map(mark => {
      if (mark.studentId === studentId) {
        return {
          ...mark,
          [type]: value
        };
      }
      return mark;
    });
    setMarksData(updatedMarks);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/marks/bulk-entry', marksData)
      .then(response => {
        setSuccessMessage('Marks added successfully');
      })
      .catch(error => {
        setErrorMessage('Error adding marks');
      });
  };

  return (
    <div className="marks-entry-excel-container">
      <h2>Marks Entry </h2>
      {year && <p><strong>Year:</strong> {year}</p>}
      {branch && <p><strong>Branch:</strong> {branch}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="marks-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Internal Marks</th>
            <th>External Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>
                <input
                  type="number"
                  value={marksData.find(mark => mark.studentId === student.id)?.internal || ''}
                  onChange={(e) => handleInputChange(student.id, 'internal', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={marksData.find(mark => mark.studentId === student.id)?.external || ''}
                  onChange={(e) => handleInputChange(student.id, 'external', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit Marks</button>
    </div>
  );
}


  
    
export default MarksEntry;
