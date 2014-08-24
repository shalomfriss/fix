Fix.events.EventDispatcher =  function()
{
	this.init();
};
Fix.extend(Fix.events.EventDispatcher, Fix.Object);

Fix.events.EventDispatcher.prototype.init = function()
{
	this._listeners = [];
};	


Fix.events.EventDispatcher.prototype.addListener = function(eventType, method, scope)
{
		if(!this._listeners[eventType])
		{
			this._listeners[eventType] = new Array();
		}
		
		var tmp = this._listeners[eventType];
		
		//If this has already been added return;
		var i = 0;
		var len = tmp.length;
		for(; i < len; i++)
		{
			//If this is already registered, overwrite and return
			if(tmp[i].scope == scope && tmp[i].method == method)
			{
				tmp[i] = {scope:scope, method: method};
				return;
			}
		}
		
		//Otherwise add it
		tmp[tmp.length] = {scope: scope, method: method};
};

Fix.events.EventDispatcher.prototype.hasListener = function(eventType)
{
	var tmp = this._listeners[eventType];
	
	if(!tmp)
	{
		return false;
	}
	
	if(tmp.length == 0)
	{
		return false;
	}
	
	if(tmp.length >= 1)
	{
		return true;
	}
	
	//Just in case
	return false;
};

Fix.events.EventDispatcher.prototype.hasListenerMethod = function(eventType, method, scope)
{
	
	var tmp = this._listeners[eventType];
	if(!tmp)
	{
		return false;
	}
	
	var i = 0;
	var len = tmp.length;
	for(; i < len; i++)
	{
		if(tmp[i].scope == scope, tmp[i].method == method)
		{
			return true;
		}
	}
	
	return false;
	
}
	
Fix.events.EventDispatcher.prototype.removeListener = function(eventType, method, scope)
{
	var tmp = this._listeners[eventType];
	if(!tmp)
	{
		return;
	}
	
	var i = 0;
	var len = tmp.length;
	for(; i < len; i++)
	{
		if(tmp[i].scope == scope, tmp[i].method == method)
		{
			tmp.splice(i, 1);
		}
	}
	
	if(tmp.length = 0)
	{
		delete this._listeners[eventType];
	}
}

/**
* Dispatch an event
*/
Fix.events.EventDispatcher.prototype.dispatch = function(event)
{
	event.target = this;
	var tmp = this._listeners[event.type];
	
	if(!tmp)
	{
		return;
	}
	
	//If this has already been added return;
	var i = 0;
	var len = tmp.length;
	for(; i < len; i++)
	{
		var item = tmp[i];
		//var func = Fix.bind(item.scope, item.method);
		var func = item.method.bind(item.scope);
		func(event);
	}
}

Fix.events.EventDispatcher.prototype.toString = function()
{
	return "[Fix.events.EventDispatcher]";
}


