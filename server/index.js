const express = require('express');
const postRouter = require('../routes/post');

const server = express();
server.use(express.json());

server.use('/api', postRouter);

module.exports = server;