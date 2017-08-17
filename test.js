var sc = require('./socket-cluster');
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
