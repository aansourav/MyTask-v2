import React, { useContext, useState } from "react";
import { TaskContext } from "../../context";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const { state, dispatch } = useContext(TaskContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [emptyTaskList, setEmptyTaskList] = useState(false);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      dispatch({
        type: "ADD",
        payload: {
          ...newTask,
        },
      });
    } else {
      dispatch({
        type: "EDIT",
        payload: {
          ...newTask,
        },
      });
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
    dispatch({
      type: "DELETE",
      payload: { taskId },
    });
    setEmptyTaskList(state.tasks.length === 1);
  };

  const handleDeleteAll = () => {
    dispatch({
      type: "DELETE_ALL",
    });
    setEmptyTaskList(true);
  };

  const handleFavourite = (taskId) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: { taskId },
    });
  };

  const handleSearch = (searchText) => {
    dispatch({
      type: "SEARCH",
      payload: { searchText },
    });
    searchText || setEmptyTaskList(false);
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
