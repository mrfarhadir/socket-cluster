# socket-cluster
clustering socket-io  for better performance

## Socket-io clustering ##
this module clusters socket-io based on the number of your system's CPU
each new instance of socket-io runs on cluster.
when a client connects to socket server 1 you can send a message from socket 2 .
very easy to use !
**assume that your system has 8 CPU core you give a base port such as 5000 then 8 socket server will start with ports from 50001 to 5008 **
*usage example*
```javascript
npm install socket-cluster
```
*then*
```javascript
var sc = require('socket-cluster');
var sc = new sc({
  port:6000,
  log:true,
}).socket;

sc.on("connection", function (client,cluster) {
  console.log(`new connection :from ${cluster.id}`);
});
sc.on("data", function (obj,cluster) {
  console.log(obj);
});
```

> for any question or getting in tocuh : info@mrfarhad.ir
