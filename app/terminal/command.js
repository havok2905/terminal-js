var Command;

Command = function(command, flags, arguments, after) {
  this.command = command;
  this.flags = flags;
  this.arguments = arguments;
  this.after = after;
};

Command.commands = [
  'help',
  'ls',
  'cd',
  'grep',
  'cat',
  'pwd'
];


Command.exists = function(command) {
  return Command.commands.indexOf(command) !== -1 ? true : false;
};


/*
 * locate files with the given keyword
 */

Command.grep = function(working) {

};


Command.help = function() {
  return Command.commands.join(' ');
};


/*
 * Navigate through the file system
 * Only supports single directory navigation currently
 */

Command.cd = function(working, target) {
  target = target[0];

  if(target === '/' || target === '/~') {
    return working.root;
  }
  else if(target === '.' || target === '') {
    return working;
  }
  else if(target === '..') {
    if(working.parent !== null) {
      return working.parent;
    }
  }
  else {
    return working.contents.filter(function(item) {
      return item instanceof Directory && item.name === target;
    })[0];
  }
};


/*
 * List current contents at your location in the filesystem
 */

Command.ls = function(working) {
  return working.contents.map(function(item) {
    return item.fullname();
  }).join(' ');
};


/*
 * Return your current location in the file system.
 */

Command.pwd = function(working) {
  function recurse(current, path) {
    if(current.parent === null) {
      path.push('~');
      return path;
    } else {
      path.push(current.name);
      return recurse(current.parent, path);
    }
  }

  return recurse(working, []).reverse().join('/');
};


/*
 * Return the contents of a file at your current location
 */

Command.cat = function(working, target) {
  target = target[0];

  return working.contents.filter(function(item) {
    return item instanceof File && (item.name + '.' + item.extension) === target;
  })[0].text;
};
