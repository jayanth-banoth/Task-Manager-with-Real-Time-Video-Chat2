# Task Manager with Real-Time Video Chat

A full-stack task management application with secure authentication and real-time video communication. Users can manage tasks and collaborate through peer-to-peer video calls.

## Features

- JWT-based user authentication and authorization
- Create, update, delete, and manage tasks
- Protected API routes
- Real-time peer-to-peer video chat using WebRTC
- WebSocket signaling with Socket.IO
- Optimized MongoDB schema with indexing
- Centralized error handling middleware

## Tech Stack

### Frontend
- React.js
- HTML5, CSS3
- Socket.IO Client
- WebRTC

### Backend
- Node.js
- Express.js
- Socket.IO
- JWT Authentication

### Database
- MongoDB

### Tools
- Git, GitHub
- Postman

## Architecture Overview

- REST APIs handle authentication and task operations
- MongoDB stores users and tasks with referenced relationships
- Socket.IO manages real-time signaling
- WebRTC enables low-latency peer-to-peer video communication

## Installation

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/DeepakSutradhar26/TaskManager.git
cd TaskManager
