var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(11);
  var button1 = new five.Button(2);
  var button2 = new five.Button(3);
  var code = [];
	var correctCode = [1,2];
	
	// Warn if overriding existing method
	if(Array.prototype.equals)
	    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
			
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
	// if the other array is a falsy value, return	
	if (!array)
		return false;
		
	// compare lengths - can save a lot of time 
	if (this.length != array.length)
		return false;

	for (var i = 0, l=this.length; i < l; i++) {
		// Check if we have nested arrays
		if (this[i] instanceof Array && array[i] instanceof Array) {
			// recurse into the nested arrays
			if (!this[i].equals(array[i]))
				return false;       
		}           
		else if (this[i] != array[i]) { 
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;   
	 	}           
	}       
	return true;
}

	// Hide method from for-in loops
	Object.defineProperty(Array.prototype, "equals", {enumerable: false});

//code input function
  var codeInput = function(num){
    return function(){
      code.push(num);
			console.log(code);
    	if(code.length > 1){
	  if(code.equals(correctCode)){
	    console.log("Code correct!");
	    led.on();
          }	
	  else{ 
 	    console.log("Code incorrect!");
	  }
	  code = [];
     	}
    };
  };

	//tie the codeInput to a button press
	button1.on("press", codeInput(2));
	button2.on("press", codeInput(1));
	
});
