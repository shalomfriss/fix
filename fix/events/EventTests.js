function EventTests()
{
	
}

EventTests.run = function()
{
	log("Create an event");
	var evt = new Fix.events.Event("evt");
	log(evt);
	
	log("dispatch events");
	Fix.events.EventCenter.addEventListener("my_function_event", function(){
		log("Static event dispatched!");
	});
	Fix.events.EventCenter.dispatch("my_function_event");
	
	var evtbus = new Fix.events.EventCenter();
	evtbus.addEventListener("my_function_event", function(){
			log("instance evnet dispatched!");
		});
	evtbus.dispatch("my_function_event");
	
	
	log("--------------------------------------------------");
	var ev = new Fix.events.EventDispatcher();
	var ev2 = new Fix.events.EventDispatcher();
	log("DISPATCHER TESTS");
	ev2.test = function(event)
	{
		log("Event caught!");
		log(event);
	}
	
	ev.addListener(Fix.events.Event.EVENT, ev2.test, ev2);
	
	var evt = new Fix.events.Event();
	evt.data ="asdf";
	ev.dispatch(evt);
	
	ev.removeListener(Fix.events.Event.EVENT, ev2.test, ev2);
	
	
	log("Add event listener and check for exitance");
	ev.addListener(Fix.events.Event.EVENT, ev2.test, ev2);
	log(ev.hasListener(Fix.events.Event.EVENT));
	log("Remove event listener and check for exitance");
	ev.removeListener(Fix.events.Event.EVENT, ev2.test, ev2);
	log(ev.hasListener(Fix.events.Event.EVENT));
	
	log("Extend EventDispatcher");
	function TestClass()
	{
		this.init();
	}
	Fix.extend(TestClass, Fix.events.EventDispatcher);
	TestClass.prototype.init = function()
	{
		log("INIT");
		this._super.init();
		this.testingx = "123";
	}
	
	
	var tt = new TestClass();
	tt.testing = function()
	{
		log("testing");
		log(this.testingx);
	}
	tt.addListener("test", tt.testing, tt);
	
	var evt = new Fix.events.Event("test");
	tt.dispatch(evt);
	
	
	log("Add event listener and check for exitance");
	tt.addListener(Fix.events.Event.EVENT, tt.test, tt);
	log("Has Listener?: " + tt.hasListener(Fix.events.Event.EVENT));
	log("Remove event listener and check for exitance");
	tt.removeListener(Fix.events.Event.EVENT, tt.test, tt);
	log("Has Listener?: " + tt.hasListener(Fix.events.Event.EVENT));
}

