const initialState = {
  tasks: [
    {
      id: crypto.randomUUID(),
      title: "Learn React",
      description:
        "Master the art of building dynamic and interactive user interfaces with React, a powerful JavaScript library.",
      tags: ["web", "react", "js"],
      priority: "High",
      isFavourite: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Build a Responsive Website",
      description:
        "Create a fully responsive website using modern web development technologies. Ensure compatibility with various devices and screen sizes.",
      tags: ["web", "responsive design", "html", "css", "javascript"],
      priority: "Medium",
      isFavourite: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Learn Node.js and Express",
      description:
        "Deepen your understanding of server-side JavaScript by mastering Node.js and Express. Explore building robust and scalable web applications.",
      tags: ["web", "node.js", "express", "javascript"],
      priority: "High",
      isFavourite: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Explore Data Visualization with D3.js",
      description:
        "Dive into the world of data visualization by learning D3.js. Create interactive and compelling visualizations to present data in a meaningful way.",
      tags: ["web", "data visualization", "d3.js", "javascript"],
      priority: "Medium",
      isFavourite: false,
    },
  ],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        tasks: [...state.tasks, action.payload],
      };
    case "EDIT": {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        }),
      };
    }
    case "DELETE":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.taskId),
      };
    case "DELETE_ALL":
      return {
        ...state,
        tasks: [],
      };
    case "TOGGLE_FAVOURITE":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.taskId) {
            return {
              ...task,
              isFavourite: !task.isFavourite,
            };
          }
          return task;
        }),
      };
    case "SEARCH":
      if (action.payload.searchText) {
        const filteredTasks = state.tasks.filter((task) =>
          task.title.toLowerCase().includes(action.payload.searchText.toLowerCase())
        );
        if (action.payload.searchText && filteredTasks.length === 0) {
          alert("No tasks found with the given search key.");
        }
        return {
          ...state,
          tasks: filteredTasks,
        };
      } else {
        return {
          ...(state = initialState),
        };
      }

    default:
      return state;
  }
};

export { initialState, taskReducer };
