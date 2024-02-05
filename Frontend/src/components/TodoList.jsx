import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const TodoList = ({ user, onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    brainstrom: "",
    todo: "",
    doing: "",
    done: "",
  });
  const [updatedTodos, setUpdatedTodos] = useState({});

  useEffect(() => {
    // Lade die To-Do-Liste beim Mounten der Komponente
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3005/todos", {
        withCredentials: true,
      });

      setTodos(response.data.todos);
    } catch (error) {
      console.error("Fehler beim Laden der To-Do-Liste:", error.message);
    }
  };

  const createTodo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/todos",
        newTodo,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Nach dem Erstellen neu laden
      loadTodos(response.data);
      // Reset der Eingabefelder
      setNewTodo({
        brainstrom: "",
        todo: "",
        doing: "",
        done: "",
      });
    } catch (error) {
      console.error("Fehler beim Erstellen des To-Do:", error);
    }
  };

  const updateTodo = async (todoId, updatedTodo) => {
    try {
      await axios.put(`http://localhost:3005/todos/${todoId}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Nach der Aktualisierung neu laden
      loadTodos();
      // Reset der aktualisierten Todos
      setUpdatedTodos({});
    } catch (error) {
      console.error("Fehler beim Aktualisieren des To-Do:", error.message);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:3005/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Nach dem Löschen neu laden
      loadTodos();
    } catch (error) {
      console.error("Fehler beim Löschen des To-Do:", error.message);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    onLogout();
    window.location.reload(true);
  };

  return (
    <div>
      <h2>To-Do-Liste</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <input
          type="text"
          placeholder="Brainstorm"
          value={newTodo.brainstrom}
          onChange={(e) =>
            setNewTodo({ ...newTodo, brainstorm: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Todo"
          value={newTodo.todo}
          onChange={(e) => setNewTodo({ ...newTodo, todo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Doing"
          value={newTodo.doing}
          onChange={(e) => setNewTodo({ ...newTodo, doing: e.target.value })}
        />
        <input
          type="text"
          placeholder="Done"
          value={newTodo.done}
          onChange={(e) => setNewTodo({ ...newTodo, done: e.target.value })}
        />
        <button onClick={createTodo}>Hinzufügen</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="text"
              value={
                updatedTodos[todo._id] !== undefined
                  ? updatedTodos[todo._id].brainstorm
                  : todo.brainstorm
              }
              onChange={(e) => {
                setUpdatedTodos({
                  ...updatedTodos,
                  [todo._id]: {
                    ...updatedTodos[todo._id],
                    brainstorm: e.target.value,
                  },
                });
              }}
            />
            <input
              type="text"
              value={
                updatedTodos[todo._id] !== undefined
                  ? updatedTodos[todo._id].todo
                  : todo.todo
              }
              onChange={(e) => {
                setUpdatedTodos({
                  ...updatedTodos,
                  [todo._id]: {
                    ...updatedTodos[todo._id],
                    todo: e.target.value,
                  },
                });
              }}
            />
            <input
              type="text"
              value={
                updatedTodos[todo._id] !== undefined
                  ? updatedTodos[todo._id].doing
                  : todo.doing
              }
              onChange={(e) => {
                setUpdatedTodos({
                  ...updatedTodos,
                  [todo._id]: {
                    ...updatedTodos[todo._id],
                    doing: e.target.value,
                  },
                });
              }}
            />
            <input
              type="text"
              value={
                updatedTodos[todo._id] !== undefined
                  ? updatedTodos[todo._id].done
                  : todo.done
              }
              onChange={(e) => {
                setUpdatedTodos({
                  ...updatedTodos,
                  [todo._id]: {
                    ...updatedTodos[todo._id],
                    done: e.target.value,
                  },
                });
              }}
            />
            <button
              onClick={() => updateTodo(todo._id, updatedTodos[todo._id])}
            >
              Aktualisieren
            </button>
            <button onClick={() => deleteTodo(todo._id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
