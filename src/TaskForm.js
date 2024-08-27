import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const validateInput = (input) => {
        if (input.trim().length < 3) {
            setError('Task must be at least 3 characters long.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInput(title)) {
            addTask(title);
            setTitle('');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        validateInput(value);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new task"
                    value={title}
                    onChange={handleInputChange}
                />
                <button type="submit" className="btn btn-primary ms-2" disabled={!title.trim()}>
                    + Add Task
                </button>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
        </form>
    );
};

export default TaskForm;
