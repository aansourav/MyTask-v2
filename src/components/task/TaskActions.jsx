import React, { useContext } from "react";
import { TaskContext } from "../../context";

const TaskActions = ({ onAddTask: handleAddTask, handleDeleteAll }) => {
  const { state } = useContext(TaskContext);

  return (
    <div className="mb-14 items-center justify-between sm:flex">
      <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
      <div className="flex items-center space-x-5">
        <button
          onClick={handleAddTask}
          className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
        >
          Add Task
        </button>
        <button
          onClick={handleDeleteAll}
          className={`rounded-md ${
            state.tasks.length <= 0 ? "bg-gray-400" : "bg-red-500"
          } px-3.5 py-2.5 text-sm font-semibold`}
          disabled={state.tasks.length <= 0}
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

export default TaskActions;
