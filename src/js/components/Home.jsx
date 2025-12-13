import React, { useState, useEffect } from "react";
import Header from "./Header";
import Input from "./Input";
import TaskList from "./TaskList";
import Footer from "./Footer";
import Button from "./Button";

// -----------------------------
// URL base de la API
// -----------------------------
// Usuario específico para guardar tareas
const API_URL = "https://playground.4geeks.com/todo/todos/todolist-crys";

export default function Home() {
  // -----------------------------
  // Estado global
  // -----------------------------
  const [tema, setTema] = useState("light"); // Tema dark/light
  const [tareas, setTareas] = useState([]); // Lista de tareas desde API

  // -----------------------------
  // Alternar tema
  // -----------------------------
  const toggleTema = () => setTema(prev => (prev === "light" ? "dark" : "light"));

  // -----------------------------
  // Aplicar clase al body
  // -----------------------------
  useEffect(() => {
    document.body.className = "";       // Limpiamos clases anteriores
    document.body.classList.add(tema);  // Añadimos clase actual
  }, [tema]);

  // -----------------------------
  // Función para cargar tareas desde la API
  // -----------------------------
  const cargarTareas = async () => {
    try {
      const resp = await fetch(API_URL);
      if (!resp.ok) throw new Error(`Error al cargar tareas: ${resp.status}`);
      const data = await resp.json();
      setTareas(Array.isArray(data) ? data : []); // Validación de array
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Cargar tareas al montar el componente
  // -----------------------------
  useEffect(() => {
    cargarTareas();
  }, []);

  // -----------------------------
  // Agregar tarea
  // -----------------------------
  const agregarTarea = async (texto) => {
    const nueva = { label: texto, done: false };
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(nueva)
      });
      if (!resp.ok) throw new Error(`Error al agregar tarea: ${resp.status}`);
      await cargarTareas(); // Refresca la lista
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Borrar tarea
  // -----------------------------
  const borrarTarea = async (id) => {
    try {
      const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!resp.ok) throw new Error(`Error al borrar tarea: ${resp.status}`);
      await cargarTareas();
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Marcar o desmarcar completada
  // -----------------------------
  const toggleTarea = async (id) => {
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;

    try {
      const resp = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ ...tarea, done: !tarea.done })
      });
      if (!resp.ok) throw new Error(`Error al actualizar tarea: ${resp.status}`);
      await cargarTareas();
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Limpiar todas las tareas
  // -----------------------------
  const limpiarTareas = async () => {
    try {
      await Promise.all(
        tareas.map(t => fetch(`${API_URL}/${t.id}`, { method: "DELETE" }))
      );
      setTareas([]); // Refresca la lista
    } catch (error) {
      console.error(error);
    }
  };

  // -----------------------------
  // Renderizado
  // -----------------------------
  return (
    <div className="justify-content">
      <Header tema={tema} toggleTema={toggleTema} />

      <div className="contenedor-principal">
        <div className="contenedor-input">
          <Input onAdd={agregarTarea} />
          {/* Botón para limpiar todas las tareas */}
          <Button onClick={limpiarTareas} className="btn-limpiar">
            Limpiar todas las tareas
          </Button>
        </div>

        <div className="contenedor-lista">
          <TaskList tareas={tareas} onDelete={borrarTarea} onToggle={toggleTarea} />
        </div>

        <div className="contenedor-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
