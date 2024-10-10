import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://127.0.0.1:5000/tasks');
        setTasks(response.data);
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!title || new Date(dueDate) <= new Date()) {
            alert('Error: Necesitas agregar un título o la fecha debe ser en el futuro');
            return;
        }
        const newTask = { title, description, due_date: dueDate };
        try {
            await axios.post('http://127.0.0.1:5000/tasks', newTask);
            fetchTasks();
            setTitle('');
            setDescription('');
            setDueDate('');
        } catch (error) {
            console.error("Error al añadir tarea:", error);
            alert('Error al añadir tarea');
        }
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://127.0.0.1:5000/tasks/${id}`);
        fetchTasks();
        setTitle('');
        setDescription('');
        setDueDate('');
        setEditingTaskId(null);
    };

    const editTask = async (id) => {
        const task = tasks.find((task) => task.id === id);
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.due_date);
        setEditingTaskId(id);
    };

    const updateTask = async (e) => {
        e.preventDefault();
        if (!title || new Date(dueDate) <= new Date()) {
            alert('Error: Necesitas agregar un título o la fecha debe ser en el futuro');
            return;
        }
        const formatDate = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        };

        const formattedDueDate = formatDate(dueDate);
        const updatedTask = { title, description, due_date: formattedDueDate };

        try {
            await axios.put(`http://127.0.0.1:5000/tasks/${editingTaskId}`, updatedTask, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            fetchTasks();
            setTitle('');
            setDescription('');
            setDueDate('');
            setEditingTaskId(null);
        } catch (error) {
            console.error('Error al editar la tarea:', error);
            alert('Error al editar la tarea');
        }
    };

    const completeTask = async (id) => {
        await axios.patch(`http://127.0.0.1:5000/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="w-50">
                <h1 className="text-center mb-4">Lista de Tareas</h1>
                <form onSubmit={editingTaskId ? updateTask : addTask} className="mb-4">
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            placeholder="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="datetime-local"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </form>
                <ul className="list-group">
                    {tasks.map((task) => (
                        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="me-auto">
                                <h5>{task.title}</h5>
                                <p>{task.description}</p>
                                <p>Fecha límite: {new Date(task.due_date).toLocaleString()}</p>
                                <p>Status: {task.completed ? 'Completada' : 'Pendiente'}</p>
                            </div>
                            <div className="d-flex flex-column">
                                <button className="btn btn-primary mb-1" onClick={() => completeTask(task.id)}>
                                    <FontAwesomeIcon icon={task.completed ? faUndo : faCheck} />
                                </button>
                                <button className="btn btn-warning mb-1" onClick={() => editTask(task.id)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskManager;