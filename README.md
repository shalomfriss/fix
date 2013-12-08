fix
===

Fix is a lightweight library that deals with some core issues such as scope resolution and event handling

One of the problems with js is the following:
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


Fix addresses this like this:

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
t1.test();			//outputs 456