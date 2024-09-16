const express = require("express")
const carsRouter = require('./cars/cars-router')

const server = express();
server.use(express.json());

server.use('/api/cars', carsRouter);

server.get('/',
(req, res)=> {
  res.status(200).json({ message: 'api running' });
});

server.use('*', 
(req,res, next)=>{
  next({ status: 404, message: 'not found'});
})

module.exports = server;
