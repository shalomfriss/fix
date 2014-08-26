//FUTURE
//fix_Router


Object.defineProperty(Object.prototype, "_fix_v1_", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: new Object()
});


//Create Fix
var Fix = Fix || {};

//Keep a reference to where this is
Fix.root = this;

/* 
	ns creates namespaces.  The supplied argument is the typical dot separated
	string.
	@param nstr:String - a domain string EXAMPLE: com.mydomain.utils
*/
Fix.ns = function(nstr)
{
	var parts = nstr.split("."),
	parent = Fix,
	i;
	
	if(parts[0] == "Fix")
	{
		parts = parts.slice(1);
	}
	
	for(i = 0; i < parts.length; i++)
	{
		if(typeof parent[parts[i]] == "undefined")
		{
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
}


/**
	Typescript style extension can access super methods but super properties get overwritten
	this is modified to include _super which can be accessed... 
	in every class an init function must be created and this._super.init(); must be called
	from in that function 
*/
Fix.extend = function (child, parent) {
    for (var p in parent) if (parent.hasOwnProperty(p)) child[p] = parent[p];
    function __() { this.constructor = child; this._super = parent.prototype; }
    __.prototype = parent.prototype;
    child.prototype = new __();
};


/**
	Bind a method to an object.  This prevents the scope from changing.  
	@param object:Object - The object to bind to 
	@param method:Function - The method to bind
*/
Fix.bind = function(object, method)
{
	if(!object || !method)
	{
		return;
	}
	return function(){
		return method.apply(object, [].slice.call(arguments));
	};
}

/**************************************************************************************************/
/**************************************************************************************************/
//Fix basic types
/**************************************************************************************************/
/**************************************************************************************************/

/*******************************************************/
//Object
/*******************************************************/

Fix.Object = function(){};
Fix.Object.prototype.toString = function()
{
	console.log("[Fix.Object]");
}


/*******************************************************/
//Namespace creation and class enumeration
/*******************************************************/
//Top level classes
Fix.classes = ["Object"];

//Fix.events
Fix.ns("Fix.events");
Fix.events.classes = ["Event", "EventCenter", "EventDispatcher"];

//Fix.loading
Fix.ns("Fix.loading");
Fix.loading.classes = ["ImageLoader", "AssetLoader"];

