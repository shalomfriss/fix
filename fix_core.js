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

//Top level classes
Fix.classes = ["Object", "Array", "Function"];


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
	Extend a class and add custom functionality
	@param Parent:* - The parent to inherit from
	@param props:Object - An object containing the properties to assign to the object
	@return Object - The object created by extending and applying the props array
*/
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



/**************************************************************************************************/
/**************************************************************************************************/
//Fix basic types
/**************************************************************************************************/
/**************************************************************************************************/

/*******************************************************/
//Object
/*******************************************************/
Fix.ns("Fix.Object");
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
		/*
		//FUTURE: add default arguments
		var slice = Array.prototype.slice,
			args = slice.call(arguments, 1);
		*/

		this[methodBody.name] = methodBody.bind(this);
	},
	toString:function()
	{
		return "[Fix.Object]";
	}
});

/*******************************************************/
//Array
/*******************************************************/
Fix.ns("Fix.Array");
Fix.Array = Fix.extend(Array, {
	__construct:function(){
		
	},
	
	toString:function()
	{
		return "[Fix.Array]";
	}
});















