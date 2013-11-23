//delete object property  test

function init()
{

  var x = {a : 'A', b : 'B'};

  say ('Object x is: ' + stringify(x, { newline: false, indent: false }));

  say('NOW DELETING property x.a...');

  //THERE ARE 4 syntaxes for deleting the property
  //delete x.a;
  //delete x['a'];
  //delete x["a"];

  var prop = "a";
  delete x[prop];

   say ('Result of deleting property a from object x is for the deleted propety x.a the typeof operator returns: ' + typeof( x.a) ); /* "undefined" */
   error ('Result of deleting property a from object x is for the deleted propety x.a the typeof operator returns: ' + typeof( x.a) ); /* "undefined" */

  say ("x.hasOwnProperty('a'); returns: " + x.hasOwnProperty('a')); /* false */
  error ("x.hasOwnProperty('a'); returns: " + x.hasOwnProperty('a')); /* false */

  //x.b = undefined;

   say ('For the  propety x.b the typeof operator returns: ' + typeof( x.b) ); /* "undefined" */
   error ('For the  propety x.b the typeof operator returns: ' + typeof( x.b) ); /* "string" */


  say ("x.hasOwnProperty('b'); returns: " + x.hasOwnProperty('b')); /* true */
  say ('Object x is: ' + stringify(x, { newline: false, indent: false }));

  error ("x.hasOwnProperty('b'); returns: " + x.hasOwnProperty('b')); /* true */
  error ('Object x is: ' + stringify(x, { newline: false, indent: false }));
}

init();