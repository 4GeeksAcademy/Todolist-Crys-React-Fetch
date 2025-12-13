import React from "react";
import Titulo from "./Titulo"; // Componente que muestra el título de la app
import Button from "./Button"; // Componente reutilizable de botón

export default function Header({ tema, toggleTema }) {
  // ✅ Header es un componente “presentacional”: no maneja estado propio,
  // solo recibe props desde Home. Esto sigue el patrón de separación UI / lógica.

  return (
    <header
      style={{
        display: "flex",           // Flexbox para distribuir elementos horizontalmente
        justifyContent: "space-between", // Título a la izquierda, botón a la derecha
        alignItems: "center",      // Centrado vertical
        padding: "1rem",           // Espaciado interno
      }}
    >
      {/* Título de la app */}
      <Titulo />

      {/* Botón de cambio de tema */}
      <Button onClick={toggleTema}>
        {/* Icono dinámico según el tema actual */}
        <i className={tema === "light" ? "bi bi-moon-fill" : "bi bi-sun-fill"}></i>
      </Button>
    </header>
  );
}
