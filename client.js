var udp = require('dgram');
const prompt = require('prompt-sync')();

const PORT = 3000;
var ServerIP = prompt('Please write the IP Address of the server you want to connect to: '); 
var client = udp.createSocket('udp4');



function clientSendMsg(){
  var message = prompt('You are connected to the server! Send a message: ');
  client.send(message, PORT, ServerIP ,function(error){
    if(error){
      console.log('An error has occurred!');
      client.close();
    }else if(message != "close"){
      console.log('Message sent to server!');
    }else{
      client.close();}
  });
}


clientSendMsg();

client.on('message',function(msg,info){
  console.log('\nServer {%s:%d} says : %s', info.address, info.port, msg.toString());
  clientSendMsg();
  //client.close();
});

