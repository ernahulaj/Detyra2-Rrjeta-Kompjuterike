var udp = require('dgram');
const { permissions } = require('./files');
const { readOnly } = require('./accessDenied');
const serverHi = "Hello there Client!\nYour message was recieved.\nYou can go to 'serverip:port/' in your browser to check out your permissions.\n";
var isDone = false;

var server = udp.createSocket('udp4');
console.log('Socket is created!');

const PORT = 3000;

server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});


server.on('message',function(msg,info){
  console.log('\nMessage received from client {%s}:{%d} : %s ', info.address, info.port, msg.toString());

  if(msg.toString() == "close"){
    server.close();
    return;
  }

  server.send(serverHi, info.port, info.address, function(error){
  if(error){
    server.close();
  }else{
    console.log('Automatic response sent to client!');
    //server.close();
  }

  if(!isDone){
    if(info.address == "127.0.0.1"){
      permissions();
    }else{
      readOnly();
    }
    isDone = true;
  }
  
});
});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  console.log('Server is up and running! Listening at port: ' + PORT);
});


server.bind(PORT);

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Connection is terminated!');
});

setTimeout(function(){
server.close();
},360000);
   
   