const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app =  express();
const server = http.createServer(app);
const io = require('socket.io')(server);


// API
const api = require('./api');

// Port
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Static path to dist (build Angular 2 app)
app.use(express.static(path.join(__dirname, '../dist')));

// Set our api
app.use('/api', api);
//Set out app port
app.set('port', port);

// All other routes go to front app
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Socket config connection
io.on('connection', (socket) => {

	console.log("user connected")

	socket.on('new-user', (user) => {
		console.log("Usuario conectado");
		io.sockets.emit('new-user', api.users);
	});

	socket.on('disconnect', (user) => {
		console.log("Usuario desconectado");
		io.sockets.emit('new-user', api.users);
	});

	socket.on('new-message', (obj) => {
		console.log('New message to publish');
		//We need to notifiy all the clients with io.sockets.emit
		io.sockets.emit('message', obj);
	});
});


server.listen(port, () =>
	console.log(`connected to localhost:${port}`)
);

