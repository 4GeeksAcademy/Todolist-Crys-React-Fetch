// Button.jsx - componente de botón reutilizable

import { Children } from "react";

export default function Button({ onClick, className, children }) {
  
  return (
    <button 
      onClick={onClick}         
      className={className}    
    >
      {children}               
    </button>
  );
}
