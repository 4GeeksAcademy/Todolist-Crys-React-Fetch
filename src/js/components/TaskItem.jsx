import React from "react";
import Button from "./Button";

export default function TaskItem({ tarea, onDelete, onToggle }) {
  return (
    // -----------------------------
    // Clase dinámica según estado
    // -----------------------------
    // Si tarea.done es true, se añade la clase "completada"
    <div className={`task-item ${tarea.done ? "completada" : ""}`}>
      
      {/* 
        Checkbox controlado
        - checked depende del estado de la tarea (done)
        - onChange notifica al padre qué tarea cambiar
      */}
      <input
        type="checkbox"
        checked={tarea.done}
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
