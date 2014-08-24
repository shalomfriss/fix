// Doesn't work with multiple inheritance objects as parents

function noMethod(name, args) {
  var parents=this.__parents_;
  
  // Go through all parents
  
  for (var i=0;i<parents.length;i++) {
    // If we find a function on the parent, we call it
    if (typeof parents[i][name] =="function") {
      return parents[i][name].apply(this, args);
    }
  }
  
  // If we get here, the method hasn't been found
  
  throw new TypeError;
}

// Used to add a parent for multiple inheritance

function addParent(obj, parent) {
  // If the object isn't initialized, initialize it
  
  if (!obj.__parents_) {
    obj.__parents_=[];
    obj.__noSuchMethod__=noMethod;
  }
  
  // Add the parent
  
  obj.__parents_.push(parent);
}