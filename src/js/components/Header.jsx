import React from "react";
import Titulo from "./Titulo"; 
import Button from "./Button"; 


export default function Header({ tema, toggleTema, currentTime }) {

    const horaActual = currentTime.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const fechaActual = currentTime.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    return (
        <header>
            <Titulo />

            <div className="contenedor-datetime">
                <p className="fecha-actual">{fechaActual}</p>
                <p className="hora-actual">{horaActual}</p>
            </div>



            <Button onClick={toggleTema}>
                <i className={tema === "light" ? "bi bi-moon-fill" : "bi bi-sun-fill"}></i>
            </Button>
        </header>
    );
}