import React from "react";

/* Footer.jsx - Componente de pie de página */
// ------------------------------------------------
// Este componente es puramente presentacional: no maneja estado ni lógica.
// Su función es mostrar información estática o enlaces útiles.

export default function Footer() {
  return (
    <footer className="footer">
      {/* Sección principal: Copyright y contacto profesional */}
      <p className="footer-links">
        © 2025 Crystian Ariel Carmona Trujillo | 
        {/* Enlace a GitHub */}
        <a 
          href="https://github.com/crysc4rmon4-web" 
          target="_blank"           // Abre en una nueva pestaña
          rel="noopener noreferrer" // Seguridad y performance
        >
          GitHub
        </a>&nbsp;

        {/* Mensaje decorativo */}
        Crafted with <span className="heart">❤️</span> & <code>code</code>.
      </p>
    </footer>
  );
}
