import { useState } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import "./components/styles.css"; // Make sure styles imported

export default function App() {
  const [tasksUpdated, setTasksUpdated] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 My Awesome Task Manager</h1>
        
      </header>

      <main className="main-content">
        <AddTask onTaskAdded={() => setTasksUpdated(!tasksUpdated)} />
        <TaskList key={tasksUpdated} />
      </main>
    </div>
  );
}



