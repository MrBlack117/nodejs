const WebSocket = require('ws');
const wsServer = new WebSocket.Server({port: 9000});
const clients = {};

wsServer.on('connection', function connection(ws) {
    const id = Math.random();
    clients[id] = ws;
    console.log('New client connected with id: ' + id);

    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        for (const id in clients) {
            clients[id].send(JSON.stringify(data));
        }
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
        delete clients[id];
    });



});