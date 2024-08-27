import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/tasks');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const addTask = async (title) => {
        try {
            const response = await fetch('http://localhost:5001/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
            const newTask = await response.json();
            setTasks([...tasks, newTask]);
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const updateTask = async (id, newTitle) => {
        try {
            const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTitle }),
            });
            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            const updatedTask = await response.json();
            setTasks(tasks.map(task => task._id === id ? updatedTask : task));
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleTaskCompleted = async (id) => {
        try {
            const taskToToggle = tasks.find(task => task._id === id);
            const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !taskToToggle.completed }),
            });
            if (!response.ok) {
                throw new Error('Failed to toggle task completion');
            }
            const updatedTask = await response.json();
            setTasks(tasks.map(task => task._id === id ? updatedTask : task));
        } catch (error) {
            setError(error.message);
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filterStatus === 'all') return true;
        return filterStatus === 'completed' ? task.completed : !task.completed;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a._id.localeCompare(b._id);
        } else {
            return b._id.localeCompare(a._id);
        }
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">To-Do List</h1>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="form-label">Filter tasks:</label>
                                    <select
                                        className="form-select"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">All</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Sort tasks:</label>
                                    <select
                                        className="form-select"
                                        value={sortOrder}
                                        onChange={(e) => setSortOrder(e.target.value)}
                                    >
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </div>
                            </div>

                            <TaskForm addTask={addTask} />
                            
                            <div className="row font-weight-bold text-muted border-bottom py-2">
                                <div className="col-2">Done</div>
                                <div className="col-7">Task</div>
                                <div className="col-3 text-end">Actions</div>
                            </div>

                            <TaskList
                                tasks={sortedTasks}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                toggleTaskCompleted={toggleTaskCompleted}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
