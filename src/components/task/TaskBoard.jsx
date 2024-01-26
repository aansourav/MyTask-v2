import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

const TaskBoard = () => {
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [emptyTaskList, setEmptyTaskList] = useState(false);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
    setEmptyTaskList(false);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowAddModal(true);
  };

  const handleCloseClick = () => {
    setTaskToEdit(null);
    setShowAddModal(false);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    if (updatedTasks.length === 0) {
      setEmptyTaskList(true);
    }
  };

  const handleDeleteAll = () => {
    setTasks([]);
    setEmptyTaskList(true);
  };

  const handleFavourite = (taskId) => {
    const favouriteTaskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[favouriteTaskIndex].isFavourite = !newTasks[favouriteTaskIndex].isFavourite;
    setTasks(newTasks);
  };

  const handleSearch = (searchText) => {
    const searchedTask = tasks.filter((task) => task.title.toLowerCase().includes(searchText.toLowerCase()));
    setTasks([...searchedTask]);
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal onCloseClick={handleCloseClick} taskToEdit={taskToEdit} onSave={handleAddEditTask} />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask handleSearch={handleSearch} />
        </div>

        <div
          className="rounded
            -xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16"
        >
          <TaskActions onAddTask={() => setShowAddModal(true)} handleDeleteAll={handleDeleteAll} />

          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            handleDelete={handleDelete}
            emptyTaskList={emptyTaskList}
            onFavourite={handleFavourite}
          />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
