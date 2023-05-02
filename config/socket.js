const FRONTEND_URL = process.env.ORIGIN || "https://queero.netlify.app" || "wss://queero.netlify.app";


const socket = (server) => {

    const io = require('socket.io')(server, {
        cors: {
            origin: [FRONTEND_URL],
        }
    });


    io.on('connect', function (socket) {

        console.log(`A user connected (${io.engine.clientsCount} users online)`);

        socket.on('chat message', () => {

            io.emit('chat message');

        });

        socket.on('disconnect', function () {

            console.log(`A user disconnected)`);

        });

        socket.on('connect_error', function (error) {

            console.log('Socket connection error:', error);

        });
    });



}

module.exports = socket


