var defaultWidth        = getParam('defaultWidth');
var defaultHeight       = getParam('defaultHeight');
var minWidth            = getParam('minWidth');
var minHeight           = getParam('minHeight');
var maxWidth            = getParam('maxWidth');
var maxHeight           = getParam('maxHeight');
var customWidth         = getParam('customHeight');
var customHeight        = getParam('customHeight');
var windowTitle         = getParam('windowTitle');
var htmlText            = getParam('htmlText');
var useCustomizedHTML   = getParam('useCustomizedHTML');
//SAMPLE BODY BACKGROUND SETTINGS
//background-color: #fff;color: #333;font-family: georgia, serif;font-size: 100%;line-height: 1.125em;margin: 0;padding: 18px"
//

var text = '

<div id="body" style="background-color: #fff;color: #333;font-family: georgia, serif;font-size: 100%;line-height: 1.125em;margin: 0;padding: 18px">\
<div id="response">\
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\
    <hr/>
    <!--span id="response"></span-->\

        <div id=btnGrp><button id="button">Generic TEST Button</button><br>\
          <button id="btnWidth">Set Custom Width</button><br>\
          <button id="btnHeight">Set Custom Height</button><br>\
          <button id="btnToggleSize">Toggle Size</button><br>\
        </div>\
    </div>\
</div>';//body div

  var text1 = 'This is an example of an <b><i><font color="red">HTML controller</font></i></b>.<br><button id="button">You can click me!</button><br><span id="response"></span>';

  var text2 = 'This is an example of an <b><i><font color="red">HTML controller</font></i></b>.<br><button id="button">You can click me!</button><br><span id="response"></span>';


function dialog() {

  if (!useCustomizedHTML || !htmlText)
  {
    htmlText = text;
  }

  if (!windowTitle)
    {windowTitle = 'HTML Controller Example';}

  controllerHTMLCreate({
    ent: getMessageEnt(),
    title: windowTitle,

    html: htmlText,


    listeners: [
                  {id: 'response'},   //output display span
                  {id: 'btnWidth',    message:'changeWidth',command:'width'},
                  {id: 'btnHeight',   message:'changeHeight',command:'height'}
                ],

    messagers: [
                {id: 'button'},   //example button
                {id: 'response'}, //example clicable span
                {                     message: 'closed', close: true},
                {id:'btnWidth',       message:'setWidth'},
                {id:'btnHeight',      message:'setHeight'},
                {id:'btnToggleSize',  message:'setSize'}],


    width:  defaultWidth,
    height: defaultHeight
  });
}


handlerCreate({
  name: 'dialog',
  channel: 'direct',
  message: 'clickStart'
});

////////////////////////////////////////////////////////////////////////////////
function buttonClick() {
  say('You clicked the button!');
  controllerMessage({ent: getMessageEnt(), message: 'response', text: 'You can also click this span!'});
}

handlerCreate({
  name: 'buttonClick',
  channel: 'controller',
  message: 'button'
});
////////////////////////////////////////////////////////////////////////////////

function responseClick() {
  controllerMessage({ent: getMessageEnt(), message: 'response', text: 'Success!'});
}

handlerCreate({
  name: 'responseClick',
  channel: 'controller',
  message: 'response'
});
////////////////////////////////////////////////////////////////////////////////

function closeClick() {
  say('Close clicked');
}

handlerCreate({
  name: 'closeClick',
  channel: 'controller',
  message: 'closed'
});
////////////////////////////////////////////////////////////////////////////////

function onSetWidthClick()
{
  var channel = 'controller';
  controllerMessage({ ent: getMessageEnt(),  message: 'changeWidth',
                                text: customWidth  });
}

handlerCreate({
  name: 'onSetWidthClick',
  channel: 'controller',
  message: 'setWidth'
});

////////////////////////////////////////////////////////////////////////////////

function onSetHeightClick()
{
  var channel = 'controller';
  controllerMessage({ ent: getMessageEnt(), message: 'changeHeight',
                                text: customHeight  });
}

handlerCreate({
  name: 'onSetHeightClick',
  channel: 'controller',
  message: 'setHeight'
});
////////////////////////////////////////////////////////////////////////////////


function onToggleSizeClick()
{
  var channel = 'controller';
  say('setting size');

  var newWidth;
  var newHeight;

  //use state machine to determine the new size
  var v, s = inc('state');
   v = s % 3;

   switch (v) {
     case 0:
        newWidth=maxWidth;
        newHeight=maxWidth;
       break;
     case 1:
        newWidth=minWidth;
        newHeight=minHeight;
       break;
     case 2:
        newWidth=defaultWidth;
        newHeight=defaultHeight;
       break;
   }


  //send the command message to get the new size set
  controllerMessage({ ent: getMessageEnt(),  message: 'changeWidth',
                                text: newWidth  });
  controllerMessage({ ent: getMessageEnt(), message: 'changeHeight',
                                text: newHeight  });

}

handlerCreate({
  name: 'onToggleSizeClick',
  channel: 'controller',
  message: 'setSize'
});
////////////////////////////////////////////////////////////////////////////////

