import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask, updateTask, toggleTaskCompleted }) => {
    return (
        <div>
            {tasks.map(task => (
                <TaskItem
                    key={task._id} // Use task._id as the key
                    task={task} // Pass the entire task object
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    toggleTaskCompleted={toggleTaskCompleted}
                />
            ))}
        </div>
    );
};

export default TaskList;
