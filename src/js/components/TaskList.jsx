import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tareas, onDelete, onToggle }) {
  // -----------------------------
  // Protección contra errores
  // -----------------------------
  // Si tareas no es un array (API devuelve error), no renderizamos
  if (!Array.isArray(tareas)) return null;

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
