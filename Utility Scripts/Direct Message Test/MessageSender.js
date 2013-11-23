

var reciever = getParam('reciever');
function click(clickdata) {


 say("sending direct message to RECIEVER: " + reciever);
 say("sender is " + getSelfEnt() );

directMessage({ ent: reciever, channel: 'my_channel', message: 'my_message', data: 'foo' , callback: 'messageCallback'});

 }

 handlerCreate({
   name: 'click',
   channel: 'direct',
   data: 'message data to be sent statically',
   message: 'clickStart'
 });

 function messageCallback(directMessageData){
     //error(directMessageData);
   say('Call back was informed: ' + stringify(directMessageData) );
      error('Call back was informed: ' + stringify(directMessageData ));

 }