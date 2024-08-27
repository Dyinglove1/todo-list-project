import React, { useState } from 'react';

const TaskItem = ({ task, deleteTask, updateTask, toggleTaskCompleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleEdit = () => {
        if (isEditing) {
            updateTask(task._id, newTitle); // Use task._id to pass the correct ID
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="row align-items-center py-2 border-bottom">
            <div className="col-2">
                <input
                    type="checkbox"
                    className="form-check-input"
                    style={{ transform: 'scale(1.5)' }}
                    checked={task.completed}
                    onChange={() => toggleTaskCompleted(task._id)} // Use task._id to pass the correct ID
                />
            </div>
            <div className="col-7">
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                ) : (
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                    </span>
                )}
            </div>
            <div className="col-3 text-end">
                <button className="btn btn-outline-secondary btn-sm" onClick={handleEdit}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => deleteTask(task._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
