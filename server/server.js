const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const public_path = path.join(__dirname, '/../public');
const port = process.env.PORT || 8080;
let app = express();
let server = http.createServer(app); // create our own server
let io = socketIO(server);

app.use(express.static(public_path));

io.on('connection', (socket) => {
    console.log("A new user just connected");

    socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the chat!",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: "Admin",
        text: "New user joined",
        createdAt: new Date().getTime()
    }); // send to everyone else except me

    socket.on('createMessage', (message) => {
        console.log("CreateMessage", message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });


    });

    socket.on('disconnect', () => {
        console.log("User is disconnected");
    });

});

server.listen(port, () => {
    console.log(`Server is out on port ${port}`);
});

