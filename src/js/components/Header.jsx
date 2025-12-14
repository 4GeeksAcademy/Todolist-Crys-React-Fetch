import React from "react";
import Titulo from "./Titulo"; // Componente que muestra el título de la app
import Button from "./Button"; // Componente reutilizable de botón

// 🔥 CAMBIO AQUÍ: Recibimos currentTime como prop
export default function Header({ tema, toggleTema, currentTime }) {
    // ✅ Header es un componente “presentacional”: no maneja estado propio,
    // solo recibe props desde Home. Esto sigue el patrón de separación UI / lógica.

    // --------------------------------------------------------------------------
    // 🔥 INICIO DE CAMBIO PARA HORA Y FECHA: Procesamiento del objeto Date
    // --------------------------------------------------------------------------
    // HERRAMIENTA: toLocaleTimeString (Método JavaScript de Date)
    // POR QUÉ: Formatea el objeto Date al idioma local (es-ES) con segundos.
    const horaActual = currentTime.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });

    // HERRAMIENTA: toLocaleDateString (Método JavaScript de Date)
    // POR QUÉ: Formatea la fecha al idioma local con el día de la semana y mes.
    const fechaActual = currentTime.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });
    // 🔥 FIN DE CAMBIO 
    // --------------------------------------------------------------------------


    return (
        <header
            style={{
                display: "flex",           
                justifyContent: "space-between", 
                alignItems: "center",      
                padding: "1rem",           
            }}
        >
            {/* Título de la app (Importado) */}
            <Titulo />

            {/* 🔥 NUEVA SECCIÓN: Contenedor de Hora y Fecha 🔥 */}
            {/* Se ubica justo a la izquierda del botón de tema como solicitaste */}
            <div className="contenedor-datetime">
                <p className="fecha-actual">{fechaActual}</p>
                <p className="hora-actual">{horaActual}</p>
            </div>
            {/* 🔥 FIN DE CAMBIO */}

            {/* Botón de cambio de tema */}
            <Button onClick={toggleTema}>
                {/* Icono dinámico según el tema actual */}
                <i className={tema === "light" ? "bi bi-moon-fill" : "bi bi-sun-fill"}></i>
            </Button>
        </header>
    );
}