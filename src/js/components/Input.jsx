import React, { useState } from "react";
import Button from "./Button";

export default function Input({ onAdd }) {

  // -----------------------------
  // Estado local del input
  // -----------------------------
  // Guarda lo que el usuario escribe.
  // Este estado NO es global, solo afecta a este componente.
  const [valor, setValor] = useState("");

  // -----------------------------
  // Función para agregar tarea
  // -----------------------------
  // 1. Valida que el texto no esté vacío
  // 2. Llama a la función del padre (Home)
  // 3. Limpia el input
  const handleAdd = () => {
    if (valor.trim() !== "") {   // trim() evita espacios antes/después
      onAdd(valor);              // delega la acción al componente padre
      setValor("");              // resetea el input (UX limpia)
    }
  };

  // -----------------------------
  // Manejo del teclado (Enter)
  // -----------------------------
  // Reutiliza EXACTAMENTE el mismo flujo que el botón
  // No duplicamos lógica (buena práctica)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && valor.trim() !== "") {
      onAdd(valor);
      setValor("");
    }
  };

  return (
    <div className="contenedor-input">

      {/* Input controlado:
          - value viene del estado
          - onChange actualiza el estado
          React siempre tiene el control del valor */}
      <input
        type="text"
        placeholder="Escribe aquí tu tarea"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Botón reutilizable
          - No sabe qué hace onAdd
          - Solo ejecuta la acción cuando se hace click */}
      <Button onClick={handleAdd}>
        Agregar <i className="bi bi-file-earmark-plus"></i>
      </Button>

    </div>
  );
}
