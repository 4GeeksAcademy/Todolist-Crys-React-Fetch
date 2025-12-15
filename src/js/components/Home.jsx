import React, { useState, useEffect } from "react";
import Header from "./Header";
import Input from "./Input";
import TaskList from "./TaskList";
import Footer from "./Footer";
import Button from "./Button";

export default function Home() {

    // CONSTANTES Y CONFIGURACIÓN (USERNAME + URL TODO API 4GEEKS)

    const USERNAME = "todolist_crys2";
    const BASE_URL = "https://playground.4geeks.com/todo";

    // Tareas predeterminadas que se le cargan a los usuarios nuevos

    const TAREAS_INICIALES = [
        "Pasear al perro",
        "Tratar de conquistar el Fetch",
        "Rezar para que renderice",
        "Ver Dragon Ball Daima"
    ];


    // ESTADOS, light por efecto y estado de tarea (la que se agrega se enlista de primera )


    const [tareas, setTareas] = useState([]);
    const [tema, setTema] = useState("light");

    // Probando el newDate con  el useState para almacenar la hora y forzar el renderizado 

    const [dateTime, setDateTime] = useState(new Date());


    //useEffect

    // Carga de tareas al montar el compononente
    useEffect(() => {
        cargarTareas();
    }, []);

    // Gestionar el tema Dark/Light
    useEffect(() => {
        document.body.className = "";
        document.body.classList.add(tema);
    }, [tema]);

    // UseEffect con setInterval - ejecucion e intervalo (cada 1segundo)

    useEffect(() => {
        const timerID = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        // Return para detener el reloj cuando el componente se desmonta 
        return function cleanup() {
            clearInterval(timerID);
        };
    }, []);

    const toggleTema = () => setTema(prev => (prev === "light" ? "dark" : "light"));



    // 4. FUNCIONES DE LA API

    // Constante para creacion automatica del usuario si salta error 404

    const cargarTareas = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/${USERNAME}`);

            if (response.status === 404) {
                console.warn("Usuario no encontrado. Iniciando creación...");
                await crearUsuario();
                return;
            }

            const data = await response.json();


            // Array invertido para que las nuevas tareas queden de primeras
            const tareasInvertidas = data.todos.slice().reverse();

            setTareas(tareasInvertidas);

        } catch (error) {
            // Error controlado, este punto es sensible

        }
    };

    // crear el usuario con metodo post, sino existe este lo llama 

    const crearUsuario = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/${USERNAME}`, {
                method: "POST"
            });

            if (response.ok) {

                await insertarTareasPorDefecto();

                await cargarTareas();
            }
        } catch (error) {
            // Error controlado: dependencia externa (API)
        }
    };

    //INSERTAR TAREAS POR DEFECTO (SEMILLA)
    const insertarTareasPorDefecto = async () => {
        const promesas = TAREAS_INICIALES.map(texto =>
            fetch(`${BASE_URL}/todos/${USERNAME}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    label: texto,
                    is_done: false
                })
            })
        );

        // Promise.all espera a que TODAS se guarden antes de continuar.
        await Promise.all(promesas);
    };

    //Seccion Agregar tarea
    const agregarTarea = async (texto) => {
        const nuevaTarea = { label: texto, is_done: false };
        try {
            const response = await fetch(`${BASE_URL}/todos/${USERNAME}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaTarea)
            });
            if (response.ok) await cargarTareas();
        } catch (error) {
            // Error controlado: fallo de red o API externa
        }
    };

    /**
     * BORRAR UNA TAREA
     */
    const borrarTarea = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/todos/${id}`, {
                method: "DELETE"
            });
            if (response.ok) await cargarTareas();
        } catch (error) {
            // Error controlado: fallo de red o API externa
        }
    };

    //Marcar completada
    const toggleTarea = async (id) => {
        const tarea = tareas.find(t => t.id === id);
        if (!tarea) return;

        
        const payload = { label: tarea.label, is_done: !tarea.is_done };

        try {
            const response = await fetch(`${BASE_URL}/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (response.ok) await cargarTareas();
        } catch (error) {
          // Error controlado: fallo de red o API externa
        }
    };

    //Limpiar toda la lista
    const limpiarTareas = async () => {
        try {
            const promesas = tareas.map(t =>
                fetch(`${BASE_URL}/todos/${t.id}`, { method: "DELETE" })
            );
            await Promise.all(promesas);
            await cargarTareas();
        } catch (error) {
            // Error controlado: fallo de red o API externa
        }
    };

    // -----------------------------
    // 5. RENDERIZADO
    // -----------------------------
    return (
        <div className="justify-content">
            
            <Header
                tema={tema}
                toggleTema={toggleTema}
                currentTime={dateTime} 
            />
         

            <div className="contenedor-principal">

                <div className="contenedor-input">
                    <Input onAdd={agregarTarea} />
                    <Button onClick={limpiarTareas} className="btn-limpiar">
                        Borrar Tareas <i className="bi bi-file-earmark-minus"></i>
                    </Button>
                </div>

                <div className="contenedor-lista">
                    
                    {Array.isArray(tareas) && tareas.length > 0 ? (
                        <TaskList
                            tareas={tareas}
                            onDelete={borrarTarea}
                            onToggle={toggleTarea}
                        />
                    ) : (
                        <div className="texto-vacio">
                            No hay tareas (o se están cargando...)
                        </div>
                    )}
                </div>

                <div className="contenedor-footer">
                    <Footer />
                </div>
            </div>
        </div>
    );
}