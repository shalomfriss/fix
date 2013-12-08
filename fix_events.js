/******************************************************************************************/
//Event
/******************************************************************************************/

Fix.ns("Fix.events");
Fix.events.classes = ["Event", "EventDispatcher"];

Fix.ns("Fix.events.Event");
Fix.events.Event = Fix.extend(Fix.Object, {
	__construct:function(aType){
		this.name = aType;
	},
	type:"event",
	data:{},
	toString:function()
	{
		return "[Fix.events.Event]";
	}
});
Fix.events.Event.EVENT = "event";


/******************************************************************************************/
//EventCenter
/******************************************************************************************/
//Based on https://github.com/krasimir/EventBus
/**

	EventCenter provides a system wide event dispatcher and handler.
	it call also be instantiated for localized event dispatching


	var ev = new Fix.events.EventCenter();
	var t1 = new Fix.Object();
	var t2 = new Fix.Object();

	t1.callback = function(evt, argx)
	{
		log("EVT");
		log(evt);
		log(argx);
	}
	
	Fix.events.EventCenter.addEventListener("callback_event", t1.callback, t1);
	Fix.events.EventCenter.dispatch("callback_event", this, "asdfasdf");

	ev.addEventListener("callback_event", t1.callback, t1);
	ev.dispatch("callback_event", this, "asdfasdf");

*/
Fix.events.EventCenter = Fix.extend(Fix.Object, {});
Fix.events.EventCenter.listeners = [];
Fix.events.EventCenter.addEventListener = function(type, callback, scope) {
	var args = [];
	var numOfArgs = arguments.length;
	for(var i=0; i<numOfArgs; i++){
		args.push(arguments[i]);
	}		
	args = args.length > 3 ? args.splice(3, args.length-1) : [];
	if(typeof this.listeners[type] != "undefined") {
		Fix.events.EventCenter.listeners[type].push({scope:scope, callback:callback, args:args});
	} else {
		Fix.events.EventCenter.listeners[type] = [{scope:scope, callback:callback, args:args}];
	}
};
Fix.events.EventCenter.removeEventListener = function(type, callback, scope) {
	if(typeof Fix.events.EventCenter.listeners[type] != "undefined") {
		var numOfCallbacks = Fix.events.EventCenter.listeners[type].length;
		var newArray = [];
		for(var i=0; i<numOfCallbacks; i++) {
			var listener = Fix.events.EventCenter.listeners[type][i];
			if(listener.scope == scope && listener.callback == callback) {
				
			} else {
				newArray.push(listener);
			}
		}
		Fix.events.EventCenter.listeners[type] = newArray;
	}
};
Fix.events.EventCenter.hasEventListener = function(type, callback, scope) {
	if(typeof Fix.events.EventCenter.listeners[type] != "undefined") {
		var numOfCallbacks = Fix.events.EventCenter.listeners[type].length;
		if(callback === undefined && scope === undefined){
			return numOfCallbacks > 0;
		}
		for(var i=0; i<numOfCallbacks; i++) {
			var listener = Fix.events.EventCenter.listeners[type][i];
			if((scope ? listener.scope == scope : true) && listener.callback == callback) {
				return true;
			}
		}
	}
	return false;
};
Fix.events.EventCenter.dispatch = function(type, target) {
	var numOfListeners = 0;
	var event = {
		type:type,
		target:target
	};
	var args = [];
	var numOfArgs = arguments.length;
	for(var i=0; i<numOfArgs; i++){
		args.push(arguments[i]);
	};				
	args = args.length > 2 ? args.splice(2, args.length-1) : [];
	args = [event].concat(args);
	if(typeof Fix.events.EventCenter.listeners[type] != "undefined") {
		var numOfCallbacks = Fix.events.EventCenter.listeners[type].length;
		for(var i=0; i<numOfCallbacks; i++) {
			var listener = Fix.events.EventCenter.listeners[type][i];
			if(listener && listener.callback) {					
				var concatArgs = args.concat(listener.args);
				listener.callback.apply(listener.scope, concatArgs);
				numOfListeners += 1;
			}
		}
	}
};
Fix.events.EventCenter.getEvents = function() {
	var str = "";
	for(var type in Fix.events.EventCenter.listeners) {
		var numOfCallbacks = Fix.events.EventCenter.listeners[type].length;
		for(var i=0; i<numOfCallbacks; i++) {
			var listener = Fix.events.EventCenter.listeners[type][i];
			str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
			str += " listen for '" + type + "'\n";
		}
	}
	return str;
};
	
Fix.events.EventCenter.prototype = {
	listeners:[],
	addEventListener:function(type, callback, scope) {
		var args = [];
		var numOfArgs = arguments.length;
		for(var i=0; i<numOfArgs; i++){
			args.push(arguments[i]);
		}		
		args = args.length > 3 ? args.splice(3, args.length-1) : [];
		if(typeof this.listeners[type] != "undefined") {
			this.listeners[type].push({scope:scope, callback:callback, args:args});
		} else {
			this.listeners[type] = [{scope:scope, callback:callback, args:args}];
		}
	},
	removeEventListener:function(type, callback, scope) {
		if(typeof this.listeners[type] != "undefined") {
			var numOfCallbacks = this.listeners[type].length;
			var newArray = [];
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				if(listener.scope == scope && listener.callback == callback) {
					
				} else {
					newArray.push(listener);
				}
			}
			this.listeners[type] = newArray;
		}
	},
	hasEventListener:function(type, callback, scope) {
		if(typeof this.listeners[type] != "undefined") {
			var numOfCallbacks = this.listeners[type].length;
			if(callback === undefined && scope === undefined){
				return numOfCallbacks > 0;
			}
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				if((scope ? listener.scope == scope : true) && listener.callback == callback) {
					return true;
				}
			}
		}
		return false;
	},
	dispatch:function(type, target) {
		var numOfListeners = 0;
		var event = {
			type:type,
			target:target
		};
		var args = [];
		var numOfArgs = arguments.length;
		for(var i=0; i<numOfArgs; i++){
			args.push(arguments[i]);
		};				
		args = args.length > 2 ? args.splice(2, args.length-1) : [];
		args = [event].concat(args);
		if(typeof this.listeners[type] != "undefined") {
			var numOfCallbacks = this.listeners[type].length;
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				if(listener && listener.callback) {					
					var concatArgs = args.concat(listener.args);
					listener.callback.apply(listener.scope, concatArgs);
					numOfListeners += 1;
				}
			}
		}
	},
	getEvents:function() {
		var str = "";
		for(var type in this.listeners) {
			var numOfCallbacks = this.listeners[type].length;
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.listeners[type][i];
				str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
				str += " listen for '" + type + "'\n";
			}
		}
		return str;
	}
};

/******************************************************************************************/
//EventDispatcher
/******************************************************************************************/
Fix.ns("Fix.events.EventDispatcher");
Fix.events.EventDispatcher = Fix.extend(Fix.Object, {
	__construct:function(){
		
	},
	_listeners:[],
	addListener:function(eventType, method, scope)
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
	},
	hasListener:function(eventType)
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
	},
	hasListenerMethod:function(eventType, method, scope)
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
		
	},
	removeListener:function(eventType, method, scope)
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
	},
	
	/**
	* Dispatch an event
	*/
	dispatch:function(event)
	{
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
	},
	toString:function()
	{
		return "[Fix.EventDispatcher]";
	}
});