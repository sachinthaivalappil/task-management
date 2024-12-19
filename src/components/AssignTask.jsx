import React, { useState } from 'react';

function AssignTask() {
  const [taskName, setTaskName] = useState('');
  const [taskDcr, setTaskDcr] = useState(''); // Task description
  const [department, setDepartment] = useState('');
  const [assignedTo, setAssignedTo] = useState(''); // Initially as a string for controlled input
  const [assignedBy, setAssignedBy] = useState(''); // Initially as a string for controlled input
  const [dateOfAssignment, setDateOfAssignment] = useState('');
  const [taskTargetDate, setTaskTargetDate] = useState('');

  const handleAssignTask = async () => {
    // Validate input fields before sending
    if (
      !taskName ||
      !taskDcr ||
      !department ||
      !assignedTo ||
      !assignedBy ||
      !dateOfAssignment ||
      !taskTargetDate
    ) {
      alert('Please fill all fields before submitting.');
      return;
    }

    try {
      // API call to assign task
      const response = await fetch('http://localhost:5226/api/assign-task', {
        method: 'POST',
        body: JSON.stringify({
          TaskName: taskName,
          TaskDcr: taskDcr,
          Department: department,
          AssignedTo: parseInt(assignedTo, 10), // Convert string to integer
          AssignedBy: parseInt(assignedBy, 10), // Convert string to integer
          DateOfAssignment: dateOfAssignment,
          TaskTargetDate: taskTargetDate,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        alert('Task assigned successfully!');
        console.log('Task assigned:', data);

        // Clear the form fields
        setTaskName('');
        setTaskDcr('');
        setDepartment('');
        setAssignedTo('');
        setAssignedBy('');
        setDateOfAssignment('');
        setTaskTargetDate('');
      } else {
        alert('Failed to assign task. Please try again.');
        console.error('Error:', data);
      }
    } catch (err) {
      console.error('Error assigning task:', err);
      alert('An error occurred while assigning the task. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>Assign Task</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          handleAssignTask();
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Task Description:</label>
          <textarea
            value={taskDcr}
            onChange={(e) => setTaskDcr(e.target.value)}
            placeholder="Enter task description"
            required
          ></textarea>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Assigned To (User ID):</label>
          <input
            type="number"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Enter assignee user ID"
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Assigned By (Admin ID):</label>
          <input
            type="number"
            value={assignedBy}
            onChange={(e) => setAssignedBy(e.target.value)}
            placeholder="Enter assigner admin ID"
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Date of Assignment:</label>
          <input
            type="date"
            value={dateOfAssignment}
            onChange={(e) => setDateOfAssignment(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Task Target Date:</label>
          <input
            type="date"
            value={taskTargetDate}
            onChange={(e) => setTaskTargetDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Assign Task
        </button>
      </form>
    </div>
  );
}

export default AssignTask;
