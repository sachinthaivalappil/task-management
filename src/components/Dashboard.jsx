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
      <h2>Dashboard</h2>

      {/* Links for admin and user */}
      {userType === 'admin' && (
        <div>
          <Link to="/assign-task">Assign Task</Link>
        </div>
      )}
      {userType === 'user' && (
        <div>
          <Link to="/update-task">Update Task</Link>
        </div>
      )}

      {/* Task Table */}
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Status</th>
            {userType === 'user' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.status}</td>
                {userType === 'user' && (
                  <td>
                    <button onClick={() => handleUpdateTask(task.id)}>Update</button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={userType === 'user' ? 4 : 3}>No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
