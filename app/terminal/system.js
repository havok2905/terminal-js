var System,
    location;

System = function(contents) {
  this.tree = new Directory('~', null, null, contents); // Master cached copy of file system
  this.working = new Directory('~', null, null, contents); // Working directory for reference
};


/*
 * Return a list of system commands that a user can use at face value
 */

System.prototype.help = function() {
  return ['ls', 'cd', 'pwd', 'cat'];
};


/*
 * Navigate through the file system
 * Only supports single directory navigation currently
 */

System.prototype.cd = function(target) {
  if(target === '/' || target === '/~') {
    this.working = this.working.root;
  }
  else if(target === '.' || target === '') {
    // DO NOTHING
  }
  else if(target === '..') {
    if(this.working.parent !== null) {
      this.working = this.working.parent;
    }
  }
  else {
    this.working = this.working.contents.filter(function(item) {
      return item instanceof Directory && item.name === target;
    })[0];
  }
};


/*
 * List current contents at your location in the filesystem
 */

System.prototype.ls = function() {
  return this.working.contents.map(function(item) {
    return item.fullname();
  });
};


/*
 * Return your current location in the file system.
 */

System.prototype.pwd = function() {
  var found = null;

  function recurse(current, path) {
    if(current.parent === null) {
      path.push('~');
      return path;
    } else {
      path.push(current.name);
      return recurse(current.parent, path);
    }
  }

  return recurse(this.working, []).reverse();
};


/*
 * Return the contents of a file at your current location
 */

System.prototype.cat = function(target) {
  return this.working.contents.filter(function(item) {
    return item instanceof File && (item.name + '.' + item.extension) === target;
  })[0].text;
};
