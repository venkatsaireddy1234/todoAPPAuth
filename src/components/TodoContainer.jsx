import React, { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";

function TodoContainer() {
  const [tasks, setTasks] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [showPara, setShowPara] = useState(false);

  const handleStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  };
  useEffect(() => {
    handleStorage();
    setShowPara(true);
  }, []);

  const handleAddTask = () => {
    setModalStatus(!modalStatus);
    setShowPara(false);
  };

  const handleClose = () => {
    setModalStatus(!modalStatus);
    setShowPara(true);
  };

  const handleSubmit = () => {
    if (newTask.trim() !== "") {
      if (editTask !== null) {
        // If editing, update the existing task
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editTask.id
              ? { ...task, name: newTask, status: "Pending" }
              : task
          )
        );
        setEditTask(null); // Clear the edit task after updating
      } else {
        // If adding a new task
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: uuid4(), name: newTask, status: "Pending" },
        ]);
      }

      setModalStatus(false);
      setNewTask("");
      setShowPara(true);
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTask(taskToEdit);
    setNewTask(taskToEdit.name);
    setModalStatus(true);
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleMoveTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" } : task
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="todoCont">
      <div className="cont">
        <p className={`para ${showPara ? "show" : "hide"}`}>
          Make Your life Easier today <br /> use our Todo Application
        </p>
        <button className="btn" onClick={() => handleAddTask()}>
          Add Your Task
        </button>
        {modalStatus && (
          <div className="modal">
            <p>Enter Your task</p>
            <input
              type="text"
              placeholder="Name of the task"
              className="input"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className="modalBtns">
              <input type="submit" onClick={handleSubmit} />
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        )}
      </div>
      {tasks.length > 0 && (
        <div>
          <div className="tasks">
            <div>
              <h3 className="pendingTasks">Pending Tasks</h3>
              <div className="tasksPendAll">
                {tasks
                  .filter((task) => task.status === "Pending")
                  .map((task) => (
                    <div className="tasksPend" key={task.id}>
                      <p>{task.name}</p>
                      <div className="taskBtns">
                        <button onClick={() => handleEdit(task.id)}>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleMoveTask(task.id)}
                          style={{ backgroundColor: "green" }}
                        >
                          Move to Completed
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="compTasks">Completed Tasks</h3>
              <div className="tasksCompAll">
                {tasks
                  .filter((task) => task.status === "Completed")
                  .map((task) => (
                    <div className="tasksComp" key={task.id}>
                      <p>{task.name}</p>
                      <button onClick={() => handleDelete(task.id)}>
                        Delete
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoContainer;
