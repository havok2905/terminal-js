var File = function(name, extension, text) {
  this.name = name;
  this.extension = extension;
  this.text = text;
};

File.prototype.fullname = function() {
  return this.name + '.' + this.extension;
};
