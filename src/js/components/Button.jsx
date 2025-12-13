// Button.jsx - componente de botón reutilizable
// ------------------------------------------------
// Este componente es “inteligente” en el sentido de que puede recibir
// cualquier acción a ejecutar (onClick) y cualquier contenido (children),
// pero no maneja estado propio.

import { Children } from "react"; // Aunque no es estrictamente necesario aquí, se puede omitir
                                   // ya que React reconoce automáticamente children

export default function Button({ onClick, className, children }) {
  // Props:
  // - onClick: función que se ejecuta al hacer click (callback desde el padre)
  // - className: permite aplicar estilos CSS desde Home o cualquier contenedor
  // - children: contenido interno del botón (texto, iconos, etc.)

  return (
    <button 
      onClick={onClick}         // Conecta el click con la función del padre
      className={className}     // Permite estilizar el botón externamente
    >
      {children}               {/* Renderiza el contenido que pasemos */}
    </button>
  );
}
