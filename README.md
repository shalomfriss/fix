fix
===

Fix is a lightweight library that deals with some core issues such as scope resolution and event handling

One of the problems with js is the following:

```javascript
var t1 = new Object();
var t2 = new Object();

t1.prop1 = "123";
t2.prop1 = "456";

t1.test = function()
{
	console.log(this.prop1);
}

t2.test = function()
{
	console.log(this.prop1);
}

t1.test(); //outputs 123
t2.test(); //outputs 456

t1.test = t2.test;
t1.test(); //outputs 123, when it should output 456
```

Fix addresses this like this:
```javascript
var t1 = new Fix.Object();
var t2 = new Fix.Object();
t1.prop1 = "123";
t2.prop1 = "456";
t1.test = function()
{
	log(this.prop1);
}
t2.addMethod(function test(test1, test2){
	log(this.prop1);
});

t1.test();		//outputs 123
t1.test = t2.test;
t1.test();		//outputs 456
```

Fix also adds better event handling by adding per object event dispatching
```javascript
//EventDispatcher
var ev = new Fix.events.EventDispatcher();
var ev2 = new Fix.events.EventDispatcher();

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
```

Also for system-wide and localized events
```javascript
//EventCenter
var ev = new Fix.events.EventCenter();

//App-wide EventCenter
Fix.events.EventCenter.addEventListener("callback_event", t1.callback, t1);
Fix.events.EventCenter.dispatch("callback_event", this, "asdfasdf");

//Localized EventCenter
ev.addEventListener("callback_event", t1.callback, t1);
ev.dispatch("callback_event", this, "asdfasdf");
```