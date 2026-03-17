const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const PORT = 3000;

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));

// Socket handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('host_input', (data) => {
    io.emit('update_field', data);
  });

  socket.on('stop_generation', () => {
    io.emit('stop_generation');
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Start server
http.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
