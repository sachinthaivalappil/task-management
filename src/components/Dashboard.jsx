import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ userType }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch dashboard data based on user type
    const fetchData = async () => {
      if (userType === 'admin') {
        // Fetch data for admin
        const response = await fetch('http://localhost:5226/api/admin-dashboard');
        const data = await response.json();
        setTasks(data);
      } else if (userType === 'user') {
        // Fetch data for user
        const response = await fetch('http://localhost:5226/api/user-dashboard');
        const data = await response.json();
        setTasks(data);
      }
    };

    if (userType) {
      fetchData();
    }
  }, [userType]);

  return (
    <div>
      <h2>Dashboard</h2>
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
          {tasks.map((task) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleUpdateTask(taskId) {
    // Logic to update task status
    console.log('Updating task', taskId);
  }
}

export default Dashboard;
