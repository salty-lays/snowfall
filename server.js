const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 3000;

// Serve client page
app.get('/', (req,res)=>res.sendFile(__dirname+'/index.html'));

// Socket handling
io.on('connection', (socket)=>{
  console.log('Client connected');
  socket.on('host_input', (data)=>io.emit('update_field',data));
  socket.on('stop_generation', ()=>io.emit('stop_generation'));
});

http.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));
