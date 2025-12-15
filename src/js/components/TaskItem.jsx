import React from "react";
import Button from "./Button";

export default function TaskItem({ tarea, onDelete, onToggle }) {
  return (
    
    <div className={`task-item ${tarea.is_done ? "completada" : ""}`}>
      
     
      <input
        type="checkbox"
        checked={tarea.is_done}
        onChange={() => onToggle(tarea.id)}
      />

      {/* Texto de la tarea */}
      <span>{tarea.label}</span>

      {/* Botón eliminar */}
      <Button className="btn-eliminar" onClick={() => onDelete(tarea.id)}>
        ×
      </Button>
    </div>
  );
}
