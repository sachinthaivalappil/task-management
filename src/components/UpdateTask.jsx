import React, { useState } from 'react';

function UpdateTask() {
  const [taskId, setTaskId] = useState('');
  const [status, setStatus] = useState('');

  const handleUpdateTask = async () => {
    const response = await fetch('http://localhost:5226/api/update-task', {
      method: 'POST',
      body: JSON.stringify({ taskId, status }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log('Task updated', data);
  };

  return (
    <div>
      <h2>Update Task</h2>
      <input
        type="text"
        placeholder="Task ID"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={handleUpdateTask}>Update Task</button>
    </div>
  );
}

export default UpdateTask;
