import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [agregarTarea, setAgregarTarea] = useState('');
  const [listaTarea, setListaTarea] = useState([]);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: agregarTarea }),
      });
      console.log(response);
      setAgregarTarea('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const obtenerListaTarea = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/item');
        const data = await response.json(); 
        setListaTarea(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerListaTarea();
  }, [listaTarea]);


  const eliminarTarea = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/item/${id}`, {
        method: 'DELETE',
      });
      const nuevaListaTarea = listaTarea.filter(item => item._id !== id);
      setListaTarea(nuevaListaTarea)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const marcarCompletado = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/item/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const nuevaListaTarea = listaTarea.map((item) =>
          item._id === id ? { ...item, completed: true } : item
        );
        setListaTarea(nuevaListaTarea);
      } else {
        console.log('Error al marcar como completado');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  
return (
  <div className="App">
    <h1>Tareas</h1>
    <form className="form" onSubmit={(e) => addItem(e)}>
      <input
        type="text"
        placeholder="Agregar nueva tarea"
        onChange={(e) => {
          setAgregarTarea(e.target.value);
        }}
        value={agregarTarea}
      />
      <button type="submit">Agregar</button>
    </form>
    <div className="todo-listItem">
      {listaTarea.map((item, index) => (
        <div className="todo-item" key={index}>
          <p className={`item-content ${item.completed ? 'completed' : ''}`}>
            {item.item}
          </p>
          {!item.completed && (
            <button
              type="button"
              className="complete-item"
              onClick={() => marcarCompletado(item._id)}
            >
              Marcar como completado
            </button>
          )}
          <button
            type="button"
            className="delete-item"
            onClick={() => eliminarTarea(item._id)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default App;
