import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/studentprofile.css'

const StudentProfile = () => {
   
      const [student, setStudent] = useState({});
      const [marks, setMarks] = useState([]);
      const [error, setError] = useState('');
    
      useEffect(() => {
        // Fetch student details
        axios.get('http://localhost:5000/api/student/profile')
          .then(response => {
            setStudent(response.data);
          })
          .catch(error => {
            setError('Error fetching student details');
          });
    
        // Fetch student marks
        axios.get(`http://localhost:5000/api/marksheet/${student.studentId}`)
          .then(response => {
            setMarks(response.data);
          })
          .catch(error => {
            setError('Error fetching student marks');
          });
      }, [student.studentId]);
    
      const handlePrint = () => {
        const printableContent = `
          <html>
            <head>
              <title>Mark Sheet</title>
              <style>
                /* Add your styles for the printable marksheet */
                body {
                  font-family: Arial, sans-serif;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid #000;
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              <h2>Mark Sheet</h2>
              <h3>Personal Details</h3>
              <p><strong>Name:</strong> ${student.name}</p>
              <p><strong>Student ID:</strong> ${student.studentId}</p>
              <p><strong>Email:</strong> ${student.email}</p>
              <p><strong>Branch:</strong> ${student.branch}</p>
              <p><strong>Year:</strong> ${student.year}</p>
              <p><strong>Semester:</strong> ${student.semester}</p>
              
              <h3>Marks</h3>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  ${marks.map(mark => `
                    <tr>
                      <td>${mark.subject}</td>
                      <td>${mark.marks}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </body>
          </html>
        `;
    
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(printableContent);
        printWindow.document.close();
        printWindow.print();
      };
    
      return (
        <div className="profile-container">
          <h2>Student Profile</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="profile-info">
            {student.imageUrl && <img src={student.imageUrl} alt="Student" className="profile-picture" />}
            <div className="personal-details">
              <h3>Personal Details</h3>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Student ID:</strong> {student.studentId}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Branch:</strong> {student.branch}</p>
              <p><strong>Year:</strong> {student.year}</p>
              <p><strong>Semester:</strong> {student.semester}</p>
            </div>
          </div>
          <div>
            <h3>Marks</h3>
            <ul>
              {marks.map((mark, index) => (
                <li key={index}>
                  <strong>{mark.subject}:</strong> {mark.marks}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={handlePrint}>Print Marksheet</button>
        </div>
      );
    }
    
    export default StudentProfile;