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

//Top level classes
Fix.classes = ["Object"];

//Event package
Fix.ns("Fix.events");
Fix.ns("Fix.loading");
Fix.events.classes = ["Event", "EventCenter", "EventDispatcher"];






/**
	Extend a class and add custom functionality
	@param Parent:* - The parent to inherit from
	@param props:Object - An object containing the properties to assign to the object
	@param bindFunctions:boolean - a value indicating whether to bind the functions to the object
	@return Object - The object created by extending and applying the props array
*/
/*
Fix.extend = function(Parent, props, bindFunctions)
{
	var Child, F, i;
	
	var bindFunctions = bindFunctions ? true : false; 
	Child = function()
	{
		if(Child._super && Child._super.hasOwnProperty("__construct"))
		{
			Child._super.__construct.apply(this, arguments);
		}
		if(Child.prototype.hasOwnProperty("__construct"))
		{
			Child.prototype.__construct.apply(this, arguments);
		}
	};
	
	Parent = Parent || Object;
	
	F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child._super = Parent.prototype;
	Child.prototype.constructor = Child;
	
	for(i in props)
	{
		if(props.hasOwnProperty(i))
		{
			Child.prototype[i] = props[i];
			if(typeof props[i] == "function" && bindFunctions == true)
			{
				console.log("FUNC");
				Child.prototype[i] = Child.prototype[i].bind(Child);
			}
			
		}
	}
	
	return Child;
}
*/

/**
	Extend / Copy / Clone an object
	@param parent:Object - The object to copy
	@param child:Object - The object to copy into
	@param skipArray:Array - An array of objects to skip
*/
Fix.copy = function(parent, child, skipArray)
{
	var i, 
		toStr = Object.prototype.toString,
		astr = "[object Array]";
		
		child = child || {};
		
		for(i in parent)
		{
			if(parent.hasOwnProperty(i))
			{
				if(typeof parent[i] === "object")
				{	
					child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
					
					var doExtend = true;
					if(skipArray)
					{
						var i = 0; 
						var len = skipArray.length;
						for(;i < len;  i++)
						{
							if(i == skipArray[i])
							{
								doExtend = false;
							}
						}
					}
					
					if(doExtend == true)
					{
						Fix.copy(parent[i], child[i]);
					}
				}
				else
				{
					var doExtend = true;
					if(skipArray)
					{
						var i = 0; 
						var len = skipArray.length;
						for(;i < len;  i++)
						{
							if(i == skipArray[i])
							{
								doExtend = false;
							}
						}
					}
					if(doExtend == true)
					{
						child[i] = parent[i];
					}
					
				}
			}
		}
}


/*
Fix.Object = Fix.extend(Object, {
	__construct:function(){
		
	},
	hasProperty:function(prop){
		
	},
	isSubclassOf:function(aClass)
	{
		
	},
	addMethod:function(methodBody)
	{
		

		this[methodBody.name] = methodBody.bind(this);
	},
	toString:function()
	{
		return "[Fix.Object]";
	},
	
	//Simulated multiple inheritance
	noMethod:function(name, args) {
	  var parents=this.__parents_;
  
	  // Go through all parents
  
	  for (var i=0;i<parents.length;i++) 
	  {
	    // If we find a function on the parent, we call it
	    if (typeof parents[i][name] =="function") 
		{
	      return parents[i][name].apply(this, args);
	    }
	  }
  	
	  // If we get here, the method hasn't been found
  
	  throw new TypeError;
	},
	
	addParent:function(obj, parent) 
	{
	  // If the object isn't initialized, initialize it
  	
	  if (!obj.__parents_) 
	  {
	    obj.__parents_=[];
	    obj.__noSuchMethod__=noMethod;
	  }
	  
	  // Add the parent
  		
	  obj.__parents_.push(parent);
	}
	
});
*/

/*******************************************************/
//Array
/*******************************************************/
/*
Fix.ns("Fix.Array");
Fix.Array = Fix.extend(Array, {
	__construct:function(){
		
	},
	
	toString:function()
	{
		return "[Fix.Array]";
	}
});
*/














