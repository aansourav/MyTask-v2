import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TaskBoard from "./components/task/TaskBoard";
import { TaskContext } from "./context";

function App() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Master the art of building dynamic and interactive user interfaces with React, a powerful JavaScript library.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavourite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <Hero />
        <TaskContext.Provider value={{ tasks, setTasks }}>
          <TaskBoard />
        </TaskContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
