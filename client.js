var udp = require('dgram');
//var buffer = require('buffer');
const prompt = require('prompt-sync')();

var client = udp.createSocket('udp4');
var message = prompt('Message to send to server: ');

// creating a client socket


//buffer msg
client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
  //client.close();
});

//sending msg
  client.send(message,2222,'192.168.0.106',function(error){
    if(error){
      client.close();
    }else{
      console.log('Message sent to server!');
    }
  });


// var data1 = Buffer.from('hello');
// var data2 = Buffer.from('world');

// //sending multiple msg
// client.send([data1,data2],2222,'localhost',function(error){
//   if(error){
//     client.close();
//   }else{
//     console.log('Data sent !!!');
//   }
// });