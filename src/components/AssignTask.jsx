import React, { useState } from 'react';

function AssignTask() {
  const [taskName, setTaskName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleAssignTask = async () => {
    // API call to assign task
    const response = await fetch('http://localhost:5226/api/assign-task', {
      method: 'POST',
      body: JSON.stringify({ taskName, assignedTo }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log('Task assigned', data);
  };

  return (
    <div>
      <h2>Assign Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Assigned To"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <button onClick={handleAssignTask}>Assign Task</button>
    </div>
  );
}

export default AssignTask;
