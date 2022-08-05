import React, { useState, useEffect } from "react";
import "../styles/App.scss";
import StatusLine from "./StatusLine";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  function addEmptyTask(status) {
    const lastTask = tasks[tasks.length - 1];

    let newTaskId = 1;

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1;
    }

    setTasks((tasks) => [
      ...tasks,
      {
        id: newTaskId,
        title: "",
        description: "",
        urgency: "",
        status: status
      }
    ]);
  }

  function addTask(taskToAdd) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id;
    });

    let newTaskList = [...filteredTasks, taskToAdd];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function deleteTask(taskId) {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  }

  function moveTask(id, newStatus) {
    let task = tasks.filter((task) => {
      return task.id === id;
    })[0];

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    task.status = newStatus;

    let newTaskList = [...filteredTasks, task];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
  }

  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let loadedTasks = localStorage.getItem("tasks");

    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTasks(tasks);
    }
  }

  // async function Activity() {
  //   const activities = await axios
  //     .get("http://www.boredapi.com/api/activity")
  //     .catch((err) => {
  //       console.log("API REQUEST ERROR: ", err);
  //     });
  //   console.log("Activitiy data: ", activities);
  // }

  return (
    <div className="App">
      <div class="hero-image">
        <div class="hero-text"></div>
      </div>

      <div className="welcome-text"></div>
      <div className="topnav">
        <div className="topnav-right">
          <a className="btn" href="https://mental-treat.herokuapp.com/home">
            Home
          </a>
          <a
            className="btn"
            href="https://mental-treat.herokuapp.com/meditation"
          >
            Meditation
          </a>
        </div>
      </div>
      <h1>Task Manager</h1>

      <main>
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="To Do"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Completed"
          />
        </section>
      </main>
      <div id="mybutton">
        <a href="https://mental-treat.herokuapp.com/activity">
          <button className="Done">Done? Get an Activity</button>
        </a>
      </div>
    </div>
  );
}

export default App;
