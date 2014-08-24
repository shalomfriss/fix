Fix.events.Event = function(eventName)
{
	this.init(eventName);
};
Fix.extend(Fix.events.Event, Fix.Object);
Fix.events.Event.EVENT = "event";
Fix.events.Event.COMPLETE = "complete";
Fix.events.Event.PROGRESS = "progress";

Fix.Object.prototype.toString = function()
{
	console.log("[Fix.events.Event]");
}

Fix.events.Event.prototype.init = function(eventName)
{
	this.type = eventName ? eventName : Fix.events.Event.EVENT;
	this.target = null;
}



