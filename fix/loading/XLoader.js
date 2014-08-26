Fix.loading.XLoader = function()
{
	this.init();
	this._bindFunctions();
}
Fix.extend(Fix.loading.ImageLoader, Fix.events.EventDispatcher);

Fix.loading.XLoader.prototype.init = function()
{
	this._super.init();
	this.request = null;
	this.fileURI = "";
	this.progress = 0;
}

Fix.loading.XLoader.prototype._bindFunctions = function()
{
	this.onLoadStart 			= Fix.bind(this, this.onLoadStart);
	this.onProgress 			= Fix.bind(this, this.onProgress);
	this.onLoad 				= Fix.bind(this, this.onLoad);
	this.onLoadEnd 				= Fix.bind(this, this.onLoadEnd);
	this.loadFile 				= Fix.bind(this, this.loadFile);
}

Fix.loading.XLoader.prototype.loadFile = function(fileURI)
{
	this.fileURI = fileURI;
    this.request = new XMLHttpRequest();
    this.request.onloadstart 	= this.onLoadStart;
    this.request.onprogress 	= this.onProgress;
    this.request.onload 		= this.onLoad;
    this.request.onloadend 		= this.onLoadEnd;
    this.request.open("GET", fileURI, true);
    //this.request.overrideMimeType('text/plain; charset=x-user-defined'); 
    this.request.send(null);
}

Fix.loading.XLoader.prototype.onloadstart = function(e)
{
	var evt = new Fix.events.Event(Fix.events.Event.START);
	this.dispatch(evt);
}

Fix.loading.XLoader.prototype.onprogress = function(e)
{
    this.progress = e.loaded / e.total * 100;
	var evt = new Fix.events.Event(Fix.events.Event.PROGRESS);
	evt.data = this.progress;
	this.dispatch(evt);
}

Fix.loading.XLoader.prototype.onload = function(e)
{
	var evt = new Fix.events.Event(Fix.events.Event.COMPLETE);
	this.dispatch(evt);
}

Fix.loading.XLoader.prototype.onloadend = function(e)
{
	var evt = new Fix.events.Event(Fix.events.Event.END);
	this.dispatch(evt);
}

