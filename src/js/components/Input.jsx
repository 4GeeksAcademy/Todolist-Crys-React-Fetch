import React, { useState } from "react";
import Button from "./Button";

export default function Input({ onAdd }) {
  
  // Estado local del input
  
  const [valor, setValor] = useState("");

  
  // Función para agregar tarea
  const handleAdd = () => {
    if (valor.trim() !== "") {
      onAdd(valor);
      setValor(""); 
    }
  };

  
  // Manejo del teclado (Enter) reutilizando funcion utton
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && valor.trim() !== "") {
      onAdd(valor);
      setValor("");
    }
  };

  return (
    <div className="contenedor-input">
     
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
