const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fetchThreatData = require('./data/threatFeed');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('../frontend/build'));  // Serves frontend React app

// Real-time threat data stream
io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Send real-time threat data every 10 seconds
    setInterval(async () => {
        const threatData = await fetchThreatData();
        socket.emit('threatData', threatData);
    }, 10000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
