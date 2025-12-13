import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tareas, onDelete, onToggle }) {
  return (
    <div className="task-list">
      {tareas.map((tarea) => (
        <TaskItem
          key={tarea.id}
          tarea={tarea}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
