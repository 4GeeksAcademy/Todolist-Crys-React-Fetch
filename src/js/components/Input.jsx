import React, { useState } from "react";
import Button from "./Button";

export default function Input({ onAdd }) {
  // -----------------------------
  // Estado local del input
  // -----------------------------
  // Guarda lo que el usuario escribe
  // Este estado es solo para este componente, no afecta globalmente
  const [valor, setValor] = useState("");

  // -----------------------------
  // Función para agregar tarea
  // -----------------------------
  // 1. Valida que no esté vacío
  // 2. Llama a la función del padre (Home)
  // 3. Limpia el input
  const handleAdd = () => {
    if (valor.trim() !== "") {
      onAdd(valor);
      setValor(""); // Resetea el input para UX limpia
    }
  };

  // -----------------------------
  // Manejo del teclado (Enter)
  // -----------------------------
  // Reutiliza la misma lógica del botón
  // Evita duplicar código
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && valor.trim() !== "") {
      onAdd(valor);
      setValor("");
    }
  };

  return (
    <div className="contenedor-input">
      {/* Input controlado */}
      <input
        type="text"
        placeholder="Escribe aquí tu tarea"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Botón reutilizable */}
      <Button onClick={handleAdd} className={"btn-agregar"}>
        Agregar <i className="bi bi-file-earmark-plus"></i>
      </Button>
    </div>
  );
}
