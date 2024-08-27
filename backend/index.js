const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://admin:password@localhost:27017/todo_db?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

// Define a Task model
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', TaskSchema);

// GET all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new task
app.post('/api/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title,
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update task
app.put('/api/tasks/:id', async (req, res) => {
    console.log('Request to update task:', req.params, req.body);

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (typeof req.body.title === 'string') {
            task.title = req.body.title;
        }
        if (typeof req.body.completed === 'boolean') {
            task.completed = req.body.completed;
        }

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE a task
app.delete('/api/tasks/:id', async (req, res) => {
    console.log('Request to delete task:', req.params);

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
