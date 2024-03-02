import React, { useState } from "react";

const Modal = ({ onClose, onSubmit, initialTask }) => {
  const [newTask, setNewTask] = useState(initialTask ? initialTask.name : "");
  const [taskDescription, setTaskDescription] = useState(
    initialTask ? initialTask.description : ""
  );

  const handleSubmit = () => {
    // Check if both newTask and taskDescription are non-empty before submitting
    if (newTask.trim() !== "" && taskDescription.trim() !== "") {
      const task = {
        name: newTask,
        description: taskDescription,
      };
      onSubmit(task);
      setNewTask("");
      setTaskDescription("");
    } else {
      // Handle case where either or both fields are empty
      alert("Both Name and Description are required.");
    }
  };

  return (
    <div className="absolute z-1001 bg-blue-100 ml-16 top-40 h-96 w-96 flex flex-col justify-around p-8">
      <h2 className="text-2xl font-semibold mb-4">Enter Your Task</h2>
      <div>
        <input
          type="text"
          placeholder="Name of the task"
          className="px-4 py-2 mb-4 border border-gray-400 rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
        />
        <textarea
          placeholder="Task Description"
          className="resize-none border border-gray-400 rounded w-full h-32 p-2"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="flex justify-around mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
