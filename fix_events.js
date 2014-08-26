/******************************************************************************************/
//Event
/******************************************************************************************/



Fix.events.ModuleLoaderEvent = function(){};
Fix.extend(Fix.events.ModuleLoaderEvent, Fix.events.Event);


/*
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
*/

//EVENTS

Fix.events.ModuleLoaderEvent.MODULE_LOADED = "moduleloaded";

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


//Fix.events.EventCenter = Fix.extend(Fix.events.EventCenter, Fix.Object);
Fix.events.EventCenter = function(){};

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
Fix.events.EventDispatcher =  function(){};
Fix.events.EventDispatcher.prototype.init = function()
{
	this._listeners = [];
}	

