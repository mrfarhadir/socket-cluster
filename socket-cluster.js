var util         = require("util");
var EventEmitter = require("events").EventEmitter;
function Socket () {
  EventEmitter.call(this);
}
util.inherits(Socket, EventEmitter);

Socket.prototype.data = function (obj) {
    this.emit("data", obj);
};
Socket.prototype.connect = function(client,worker) {
  this.emit("connect",client,worker);
}
Socket.prototype.disconnect = function(client,worker){
  this.emit('disconnect',client,worker);
}
var _socket =  function(args){

  if (typeof args.log !== 'undefined' && args.log === true) _socket.log=true;
  _socket.port=args.port;
  var socket = new Socket();

  const cluster = require('cluster');
  const numCPUs = require('os').cpus().length;
  var server = require('http').createServer();
  var io=[];
  if (cluster.isMaster) {
    if (_socket.log)
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      if (_socket.log)
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    var i = cluster.worker.id ;
    port=_socket.port+i;
    io[i] = require('socket.io')(server);
    io[i].on('connection', function(client){
      socket.connect(client,cluster.worker);
      client.on('data', function(data){
        socket.data(data,cluster.worker);
      });
      client.on('disconnect', function(client){
        socket.disconnect(client,cluster.worker);
      });
    });
    server.listen(port,function(){
      if (_socket.log)
      console.log(`socket running on port ${port}`);
    });
  }
  _socket.prototype.socket=socket;
}
module.exports = _socket ;
