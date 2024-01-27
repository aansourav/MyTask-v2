import React, { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TaskBoard from "./components/task/TaskBoard";
import { TaskContext } from "./context";
import { initialState, taskReducer } from "./reducers/TaskReducer";

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <Hero />
        <TaskContext.Provider value={{ state, dispatch }}>
          <TaskBoard />
          <ToastContainer />
        </TaskContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
