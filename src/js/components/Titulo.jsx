import React from "react";

/* Titulo.jsx - Componente de encabezado visual */
// ------------------------------------------------
// Este componente es puramente presentacional: no maneja estado ni lógica.
// Se encarga de mostrar el título y subtítulo de la aplicación.

export default function Titulo() {
  return (
    <div className="container-fluid">
      {/* Título principal */}
      <h1 className="titulo-principal">💪 ¡Tus misiones del día!</h1>

      {/* Subtítulo motivacional */}
      <h3 className="subtitulo">
        Completa tus tareas, una a una, y conquista tu día.
      </h3>
    </div>
  );
}
