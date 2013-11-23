 function click(clickdata) {



 say("reciever is " + getSelfEnt() );
 error("reciever is " + getSelfEnt() );

 }

 handlerCreate({
   name: 'click',
   channel: 'direct',
   data: 'message data to be sent statically',
   message: 'clickStart'
 });



 handlerCreate( {name: 'myHandler', channel: 'my_channel', message: 'my_message'} );

 function myHandler(){
   say('reciever got the message');
      error('reciever got the message');
 }