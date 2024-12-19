import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

function Dashboard({ userType, userId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch dashboard data based on user type and userId
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5226/products/fetch-task',
          {
            userId,
            userType,
          },
          {
            headers: {
              'Content-Type': 'application/json', // Set content type to JSON
            },
          }
        );
        setTasks(response.data); // Axios automatically parses JSON
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (userType && userId) {
      fetchData();
    }
  }, [userType, userId]); // Include userId in dependencies

  // Function to handle task updates
  const handleUpdateTask = (taskId) => {
    console.log('Updating task', taskId);
    // Add logic to update task status here
  };

  return (
    <div>
      {/* Buttons at the top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {userType === 'admin' && (
          <button
            onClick={() => navigate('/assign-task')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Assign Task
          </button>
        )}
        {userType === 'user' && (
          <button
            onClick={() => navigate('/update-task')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Update Task
          </button>
        )}
      </div>

      {/* Tables based on user type */}
      <h2>{userType === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h2>
      {userType === 'admin' ? (
        // Admin Table
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        // User Table
        <table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                  <td>
                    <button onClick={() => handleUpdateTask(task.id)}>Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;