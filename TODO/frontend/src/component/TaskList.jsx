import React, { useEffect, useState } from "react";
import "../style/tasklist.css"

const TaskList = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let response = await fetch("http://localhost:4000/tasks");
    let list = await response.json();

    setTaskData(list.task); // ✅ correct
  };

  return (
    <div className="task-container">
  <h1 className="task-heading">TO DO LIST</h1>

  <table className="task-table">
    <thead>
      <tr>
        <th>S.no</th>
        <th>Title</th>
        <th>Description</th>
      </tr>
    </thead>

    <tbody>
      {taskData.map((item, index) => (
        <tr key={item._id} className="task-row">
          <td>{index + 1}</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default TaskList;
