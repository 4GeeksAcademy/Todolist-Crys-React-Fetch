import React, { useState, useEffect } from "react";

// Importamos los componentes hijos
import Header from "./Header";
import Input from "./Input";
import TaskList from "./TaskList";
import Footer from "./Footer";

// -----------------------------
// URL base de la API
// -----------------------------
// Reemplazamos 'tuUsuario' por 'todolist-crys'
// Esta URL será el "espacio de almacenamiento" de tus tareas en la API
const API_URL = "https://playground.4geeks.com/todo/todos/todolist-crys";

const Home = () => {

  // -----------------------------
  // Estado del tema Dark/Light
  // -----------------------------
  // useState permite mantener un estado local en React
  const [tema, setTema] = useState("light");

  // Función para alternar tema
  const toggleTema = () => {
    // prev es el valor anterior del estado
    // Operador ternario: si era light pasa a dark, si era dark pasa a light
    setTema(prev => (prev === "light" ? "dark" : "light"));
  };

  // -----------------------------
  // useEffect para aplicar el tema al body
  // -----------------------------
  useEffect(() => {
    document.body.className = "";       // Limpiamos clases anteriores
    document.body.classList.add(tema);  // Agregamos la clase actual del tema
    // [] → se ejecutaría solo al montar, [tema] → se ejecuta cada vez que tema cambia
  }, [tema]);

  // -----------------------------
  // Estado de las tareas
  // -----------------------------
  // Inicialmente vacío, luego lo llenaremos desde la API
  const [tareas, setTareas] = useState([]);

  // -----------------------------
  // Función para cargar tareas desde la API
  // -----------------------------
  const cargarTareas = async () => {
    try {
      // Fetch GET por defecto, devuelve las tareas en JSON
      const resp = await fetch(API_URL);
      const data = await resp.json();    // Parseamos la respuesta a objeto JS
      setTareas(data);                   // Actualizamos el estado local de React
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  // -----------------------------
  // useEffect para cargar tareas al montar el componente
  // -----------------------------
  useEffect(() => {
    cargarTareas();
  }, []); // Array vacío → se ejecuta solo al montar el componente

  // -----------------------------
  // Función para agregar tarea
  // -----------------------------
  const agregarTarea = async (texto) => {
    // La API espera la propiedad 'label' y 'done'
    const nueva = {
      label: texto,
      done: false
    };

    try {
      // Enviamos POST a la API
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8" // Importante para que la API interprete JSON
        },
        body: JSON.stringify(nueva) // Convertimos objeto JS a JSON
      });

      if (!resp.ok) throw new Error(`Error al agregar tarea: ${resp.status}`);

      // Actualizamos la lista local con la información más reciente
      await cargarTareas();

    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Función para borrar tarea
  // -----------------------------
  const borrarTarea = async (id) => {
    try {
      // DELETE hacia la tarea específica por su id
      const resp = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!resp.ok) throw new Error(`Error al borrar tarea: ${resp.status}`);

      // Actualizamos lista local
      await cargarTareas();

    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Función para marcar tarea completada
  // -----------------------------
  const toggleTarea = async (id) => {
    // Buscamos la tarea que queremos actualizar
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return; // Si no existe, salimos

    try {
      // PUT para actualizar la tarea
      const resp = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        // Cambiamos 'done' al valor contrario
        body: JSON.stringify({ ...tarea, done: !tarea.done })
      });

      if (!resp.ok) throw new Error(`Error al actualizar tarea: ${resp.status}`);

      // Sincronizamos la lista
      await cargarTareas();

    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Función para limpiar todas las tareas
  // -----------------------------
  const limpiarTareas = async () => {
    try {
      // Borramos todas las tareas usando Promise.all para hacer las requests en paralelo
      await Promise.all(
        tareas.map(t => fetch(`${API_URL}/${t.id}`, { method: "DELETE" }))
      );

      // Actualizamos estado local
      setTareas([]);

    } catch (error) {
      console.error("Error al limpiar tareas:", error);
    }
  };

  // -----------------------------
  // Renderizado de la UI
  // -----------------------------
  return (
    <div className="justify-content">

        {/* Header */}
        <Header tema={tema} toggleTema={toggleTema} />

        {/* Contenedor principal */}
        <div className="contenedor-principal">

            {/* Sección del input para agregar tareas nueva */}
            <div className="contenedor-input">
                <Input onAdd={agregarTarea} />
                <button onClick={limpiarTareas}>Limpiar todas las tareas</button>
            </div>

            {/* Sección de la lista de tareas */}
            <div className="contenedor-lista">
                <TaskList
                    tareas={tareas}
                    onDelete={borrarTarea}
                    onToggle={toggleTarea}
                />
            </div>

			{/* Sección de Footer */}
            <div className="contenedor-footer">
                <Footer/>
            </div>

        </div>
    </div>
  );
};

export default Home;
