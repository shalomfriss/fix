/**
	The ImageLoader class loads images using XMLHttpRequest, which allows it to track loading progress
*/
Fix.loading.ImageLoader = function()
{
	this.init();
	this._bindFunctions();
}
Fix.extend(Fix.loading.ImageLoader, Fix.events.EventDispatcher);

Fix.loading.ImageLoader.prototype.init = function()
{
	this._super.init();
	this.request = null;
	this.imageURI = "";
	this.progress = 0;
	
}

Fix.loading.ImageLoader.prototype._bindFunctions = function()
{
	this.onLoadStart 			= Fix.bind(this, this.onLoadStart);
	this.onProgress 			= Fix.bind(this, this.onProgress);
	this.onLoad 				= Fix.bind(this, this.onLoad);
	this.onLoadEnd 				= Fix.bind(this, this.onLoadEnd);
	this.loadImage 				= Fix.bind(this, this.loadImage);
	this.getEncodedImageString 	= Fix.bind(this, this.getEncodedImageString);
	this.getEncodedImageElement = Fix.bind(this, this.getEncodedImageElement);
	this.base64Encode 			= Fix.bind(this, this.base64Encode);
}

Fix.loading.ImageLoader.prototype.loadImage = function(imageURI)
{
    this.request = new XMLHttpRequest();
    this.request.onloadstart 	= this.onLoadStart;
    this.request.onprogress 	= this.onProgress;
    this.request.onload 		= this.onLoad;
    this.request.onloadend 		= this.onLoadEnd;
    this.request.open("GET", imageURI, true);
    this.request.overrideMimeType('text/plain; charset=x-user-defined'); 
    this.request.send(null);
}

Fix.loading.ImageLoader.prototype.onLoadStart = function(e)
{
	console.log("START LOAD");
	var evt = new Fix.events.Event(Fix.events.Event.START);
	this.dispatch(evt);
}

Fix.loading.ImageLoader.prototype.onLoad = function(e)
{
	console.log("LOAD");
}

Fix.loading.ImageLoader.prototype.onLoadEnd = function(e)
{
	console.log("END LOAD");
	var evt = new Fix.events.Event(Fix.events.Event.COMPLETE);
	this.dispatch(evt);
}

Fix.loading.ImageLoader.prototype.onProgress = function(e)
{
    this.progress = e.loaded / e.total * 100;
	var evt = new Fix.events.Event(Fix.events.Event.PROGRESS);
	evt.data = this.progress;
	this.dispatch(evt);
}


Fix.loading.ImageLoader.prototype.getEncodedImageString = function(inputStr) 
{
	return "data:image/jpeg;base64," + this.base64Encode(this.request.responseText);
}

Fix.loading.ImageLoader.prototype.getEncodedImageElement = function(inputStr) 
{
	return "<img src='" + "data:image/jpeg;base64," + this.base64Encode(this.request.responseText) + "' />";
}

// This encoding function is from Philippe Tenenhaus's example at http://www.philten.com/us-xmlhttprequest-image/
Fix.loading.ImageLoader.prototype.base64Encode = function(inputStr) 
{
   var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
   var outputStr = "";
   var i = 0;
   
   while (i < inputStr.length)
   {
       //all three "& 0xff" added below are there to fix a known bug 
       //with bytes returned by xhr.responseText
       var byte1 = inputStr.charCodeAt(i++) & 0xff;
       var byte2 = inputStr.charCodeAt(i++) & 0xff;
       var byte3 = inputStr.charCodeAt(i++) & 0xff;

       var enc1 = byte1 >> 2;
       var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
       
       var enc3, enc4;
       if (isNaN(byte2))
       {
           enc3 = enc4 = 64;
       }
       else
       {
           enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
           if (isNaN(byte3))
           {
               enc4 = 64;
           }
           else
           {
               enc4 = byte3 & 63;
           }
       }

       outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
    } 
   
    return outputStr;
}