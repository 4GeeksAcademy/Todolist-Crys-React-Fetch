import React from "react";
import Button from "./Button";

export default function TaskItem({ tarea, onDelete, onToggle }) {
  return (
    // -----------------------------
    // Clase dinámica según estado
    // -----------------------------
    // Si tarea.done es true, se añade la clase "completada"
    // Esto permite cambiar estilos SOLO con CSS
    <div className={`task-item ${tarea.done ? "completada" : ""}`}>
      
      {/* 
        Checkbox controlado
        - checked depende del estado de la tarea (done)
        - onChange notifica al padre qué tarea se quiere actualizar
        - TaskItem NO cambia el estado, solo avisa
      */}
      <input
        type="checkbox"
        checked={tarea.done}
        onChange={() => onToggle(tarea.id)}
      />

      {/* 
        Texto de la tarea
        - label viene directamente de la API
        - TaskItem solo renderiza, no transforma datos
      */}
      <span>{tarea.label}</span>

      {/* 
        Botón eliminar
        - Reutiliza el componente Button
        - onClick ejecuta la función del padre
      */}
      <Button className="btn-eliminar" onClick={() => onDelete(tarea.id)}>
        ×
      </Button>
    </div>
  );
}
