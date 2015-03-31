var Directory = function(name, parent, root, contents) {
  this.name = name;
  this.parent = parent;
  this.root = root || this; // Can't self reference an object that hasn't been newed yet
  this.contents = [];

  for(var x=0; x<contents.length; x++) {
    if(contents[x].type === 'file') {
      this.contents.push(new File(contents[x].name, contents[x].extension, contents[x].text));
    }
    else if(contents[x].type === 'directory') {
      this.contents.push(new Directory(contents[x].name, this, this.root, contents[x].contents));
    }
  }
};

Directory.prototype.fullname = function() {
  return this.name;
};
