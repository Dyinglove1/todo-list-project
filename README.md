Certainly! Here is the README content formatted as code:

```markdown
# To-Do List Application

This is a simple To-Do List application built with React.js on the frontend, Express.js on the backend, and MongoDB for data storage. The application allows users to create, update, delete, and filter tasks. This project is also Dockerized to easily set up and run MongoDB.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Create Tasks:** Add new tasks to your to-do list.
- **Update Tasks:** Edit the details of existing tasks.
- **Delete Tasks:** Remove tasks that are no longer needed.
- **Filter and Sort:** Filter tasks by status (completed/pending) and sort them by date.
- **Persistent Storage:** Tasks are stored in MongoDB, ensuring data persists across sessions.

## Installation

To run this project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/get-started) (if you want to use Docker for MongoDB)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
cd REPOSITORY_NAME
```

### Install Dependencies

#### Backend

Navigate to the `backend` directory and install the required Node.js packages:

```bash
cd backend
npm install
```

#### Frontend

Navigate to the `todo-list` directory and install the required Node.js packages:

```bash
cd ../todo-list
npm install
```

## Running the Application

### Using Docker (Recommended)

1. Ensure Docker is installed and running on your machine.
2. From the root directory of the project, run the following command to start MongoDB:

   ```bash
   docker-compose up -d
   ```

3. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

4. Start the frontend server:

   ```bash
   cd ../todo-list
   npm start
   ```

5. Open your web browser and navigate to `http://localhost:3000` to view the application.

### Without Docker

If you prefer to run MongoDB locally without Docker:

1. Install MongoDB manually on your machine.
2. Update the MongoDB connection string in `backend/index.js` if necessary.
3. Follow the same steps as above to start the backend and frontend servers.

## Project Structure

```plaintext
root-folder/
├── backend/               # Backend API using Express.js and Mongoose
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   └── ...
├── mongo-data/            # MongoDB data storage (ignored by Git)
├── todo-list/             # Frontend application using React.js
│   ├── src/               # React source files
│   ├── public/            # Public assets (HTML, Favicon)
│   ├── package.json       # Frontend dependencies
│   └── ...
├── docker-compose.yml     # Docker Compose file for MongoDB
└── README.md              # This README file
```

## Technologies Used

- **Frontend:** React.js, Bootstrap
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Containerization:** Docker

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
