Fix.loading.AssetLoader = function()
{
	this.init();
}
Fix.extend(Fix.loading.AssetLoader, Fix.events.EventDispatcher);

Fix.loading.AssetLoader.prototype.init = function()
{
	this._super.init();
	this.files = [];
	this.percentLoaded = 0;
	this.percentTotal = 0;
	this.filesLoaded = 0;
	this.filesTotal = 0;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
}

Fix.loading.AssetLoader.prototype.addFile = function(aFile)
{
	
}

Fix.loading.AssetLoader.prototype.addFiles = function(aFileArray)
{
	
}