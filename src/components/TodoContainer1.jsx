import React, { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import Modal from "./Modal";

function TodoContainer1() {
  const [showPara, setShowPara] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  const handleAddTask = () => {
    setModalStatus(!modalStatus);
    setShowPara(!showPara);
  };

  const handleNormalSubmit = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: uuid4(),
        name: newTask.name,
        description: newTask.description,
        status: "To Do", // Set the initial status to "To Do"
      },
    ]);

    setModalStatus(false);
    setShowPara(true);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleClose = () => {
    setModalStatus(!modalStatus);
    setShowPara(!showPara);
  };

  const handleEdit = (id) => {
    let editTask = tasks.find((task) => task.id === id);
    if (editTask) {
      setEditTask({ ...editTask }); // Set the entire task object
    }
    setModalStatus(!modalStatus);
    setShowPara(!showPara);
  };

  const handleEditSubmit = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editTask.id
          ? {
              ...task,
              name: updatedTask.name,
              description: updatedTask.description,
              status: "To Do", // Set the status to "To Do" after editing
            }
          : task
      )
    );
    setEditTask(null);
    setModalStatus(false);
    setShowPara(true);
  };

  const handleDelete = (id) => {
    let deleteTask = tasks.filter((task) => task.id !== id);
    setTasks(deleteTask);
  };

  const handleMoveTask = (taskId, newStatus) => {
    let updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center">
        <p
          className={`text-4xl font-semibold text-gray-800 ${
            showPara ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          Make Your Life Easier Today <br /> Use Our Todo Application
        </p>
        <button
          className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAddTask()}
        >
          Add Your Task
        </button>
        {modalStatus && (
          <Modal
            onClose={handleClose}
            onSubmit={editTask ? handleEditSubmit : handleNormalSubmit}
            initialTask={
              editTask
                ? { name: editTask.name, description: editTask.description }
                : ""
            }
          />
        )}
      </div>
      {tasks.length > 0 && (
        <div className="flex mt-10">
          {/* To Do */}
          <div className="p-4 rounded-lg mr-4 flex-1">
            <h3 className="text-2xl font-semibold mb-4">To Do</h3>
            <div className="">
              {tasks
                .filter((task) => task.status === "To Do")
                .map((task) => (
                  <div
                    className="bg-gray-200 p-4 rounded-lg mb-4"
                    key={task.id}
                  >
                    <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
                    <p className="mb-4">{task.description}</p>
                    <div className=" flex justify-between">
                      <div className=" flex items-center">
                        <button
                          onClick={() => handleEdit(task.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-2  rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold  p-2 rounded mr-2"
                        >
                          Delete
                        </button>
                      </div>
                      <button
                        className=" bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-1 rounded mr-2"
                        onClick={() => handleMoveTask(task.id, "In Progress")}
                      >
                        Move to In Progress
                      </button>
                      <button
                        onClick={() => handleMoveTask(task.id, "Completed")}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-1 rounded mr-2"
                      >
                        Move to Completed
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="p-4 rounded-lg ml-4 flex-1">
            <h3 className="text-2xl font-semibold mb-4">In Progress</h3>
            <div className=" ">
              {tasks
                .filter((task) => task.status === "In Progress")
                .map((task) => (
                  <div
                    className="bg-blue-200 p-4 rounded-lg mb-4"
                    key={task.id}
                  >
                    <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
                    <p className="mb-4">{task.description}</p>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold   p-2 rounded mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleMoveTask(task.id, "Completed")}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-1 rounded mr-2"
                      >
                        Move to Completed
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Completed */}
          <div className="p-4 rounded-lg ml-4 flex-1">
            <h3 className="text-2xl font-semibold mb-4">Done</h3>
            <div className="">
              {tasks
                .filter((task) => task.status === "Completed")
                .map((task) => (
                  <div
                    className="bg-blue-200 p-4 rounded-lg mb-4"
                    key={task.id}
                  >
                    <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
                    <p className="mb-4">{task.description}</p>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoContainer1;
