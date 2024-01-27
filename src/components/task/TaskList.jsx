import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { TaskContext } from "../../context";

const getRandomColor = (index) => {
  const storedColors = JSON.parse(localStorage.getItem("tagColors")) || {};
  if (storedColors[index]) {
    return storedColors[index];
  }

  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  localStorage.setItem(
    "tagColors",
    JSON.stringify({
      ...storedColors,
      [index]: color,
    })
  );

  return color;
};

const TaskList = ({ onEdit, handleDelete, emptyTaskList, onFavourite }) => {
  const { state } = useContext(TaskContext);

  return (
    <div className="overflow-auto">
      <table className="table-fixed overflow-auto xl:w-full">
        {emptyTaskList ? (
          <h1 className="text-center text-3xl">Task List is empty!</h1>
        ) : (
          <thead>
            <tr>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]"> Title </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-full"> Description </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]"> Tags </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Priority </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Options </th>
            </tr>
          </thead>
        )}
        <tbody>
          {state.tasks.map((task, index) => (
            <tr
              key={task.id}
              className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
            >
              <td>
                <button onClick={() => onFavourite(task.id)}>
                  {task.isFavourite ? <FaStar color="yellow" /> : <FaStar color="gray" />}
                </button>
              </td>

              <td>{task.title}</td>
              <td>
                <div>{task.description}</div>
              </td>
              <td>
                <ul className="flex justify-center gap-1.5 flex-wrap">
                  {Array.isArray(task.tags) &&
                    task.tags.map((tag) => (
                      <li key={tag}>
                        <span
                          className="inline-block h-5 whitespace-nowrap rounded-[45px] px-2.5 text-sm capitalize text-[#F4F5F6]"
                          style={{ backgroundColor: getRandomColor(index) }}
                        >
                          {tag}
                        </span>
                      </li>
                    ))}
                </ul>
              </td>
              <td className="text-center">{task.priority}</td>
              <td>
                <div className="flex items-center justify-center space-x-3">
                  <button className="text-red-500" onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                  <button className="text-blue-500" onClick={() => onEdit(task)}>
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
