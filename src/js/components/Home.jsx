import React, { useState, useEffect } from "react";
import Header from "./Header";
import Input from "./Input";
import TaskList from "./TaskList";
import Footer from "./Footer";
import Button from "./Button";

export default function Home() {
  // -----------------------------
  // 1. CONSTANTES Y CONFIGURACIÓN
  // -----------------------------
  const USERNAME = "todolist_crys2";
  const BASE_URL = "https://playground.4geeks.com/todo";

  // Estas son las tareas que se cargarán si el usuario es nuevo
  const TAREAS_INICIALES = [
    "Pasear al perro",
    "Tratar de conquistar el Fetch",
    "Rezar para que renderice",
    "No morir en el intento"
  ];
  
  // -----------------------------
  // 2. ESTADOS
  // -----------------------------
  const [tareas, setTareas] = useState([]); 
  const [tema, setTema] = useState("light");

  // -----------------------------
  // 3. EFECTOS (Ciclo de vida)
  // -----------------------------

  // Cargar tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  // Gestionar el tema Dark/Light
  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(tema);
  }, [tema]);

  const toggleTema = () => setTema(prev => (prev === "light" ? "dark" : "light"));

  // -----------------------------
  // 4. FUNCIONES DE LA API
  // -----------------------------

  /**
   * CONSULTAR TAREAS
   * Intenta leer el usuario. Si da error 404, inicia el proceso de creación.
   */
  const cargarTareas = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${USERNAME}`);
      
      if (response.status === 404) {
        console.warn("Usuario no encontrado. Iniciando creación...");
        await crearUsuario();
        return;
      }

      const data = await response.json();
      // Asignamos el array 'todos' que viene dentro del objeto usuario
      setTareas(data.todos); 

    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  };

  /**
   * CREAR USUARIO
   * Se llama solo si el usuario no existe.
   */
  const crearUsuario = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${USERNAME}`, {
        method: "POST"
      });
      
      if (response.ok) {
        console.log("Usuario creado con éxito. Insertando tareas por defecto...");
        // AQUÍ ESTÁ LA CLAVE: Insertamos las tareas base antes de mostrar nada
        await insertarTareasPorDefecto();
        // Una vez insertadas, recargamos para mostrarlas
        await cargarTareas(); 
      }
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  /**
   * INSERTAR TAREAS POR DEFECTO (SEMILLA)
   * Recorre tu lista de tareas iniciales y las envía todas a la vez.
   */
  const insertarTareasPorDefecto = async () => {
    // Creamos un array de "promesas" (peticiones pendientes)
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
    // Esto evita que carguemos la lista a medias.
    await Promise.all(promesas);
  };

  /**
   * AGREGAR UNA TAREA
   */
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
      console.error("Error agregando tarea:", error);
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
      console.error("Error borrando tarea:", error);
    }
  };

  /**
   * MARCAR COMO COMPLETADA/PENDIENTE
   */
  const toggleTarea = async (id) => {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;

    // Invertimos el valor de is_done
    const payload = { label: tarea.label, is_done: !tarea.is_done };

    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (response.ok) await cargarTareas();
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  /**
   * LIMPIAR TODA LA LISTA
   */
  const limpiarTareas = async () => {
    try {
      const promesas = tareas.map(t => 
        fetch(`${BASE_URL}/todos/${t.id}`, { method: "DELETE" })
      );
      await Promise.all(promesas);
      await cargarTareas();
    } catch (error) {
      console.error("Error limpiando tareas:", error);
    }
  };

  // -----------------------------
  // 5. RENDERIZADO
  // -----------------------------
  return (
    <div className="justify-content">
      <Header tema={tema} toggleTema={toggleTema} />

      <div className="contenedor-principal">
        
        <div className="contenedor-input">
          <Input onAdd={agregarTarea} />
          <Button onClick={limpiarTareas} className="btn-limpiar">
            Borrar Tareas <i class="bi bi-file-earmark-minus"></i>
          </Button>
        </div>

        <div className="contenedor-lista">
          {/* Renderizado condicional seguro */}
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