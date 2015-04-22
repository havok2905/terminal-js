var System = require('./terminal/system.js');
var UI = require('./terminal/ui.js');

window.onload = function() {
  var system,
      input;

  system = new System([
    { type: 'file', name: 'foo', extension: 'txt', text: 'foo'},
    { type: 'file', name: 'bar', extension: 'txt', text: 'bar' },
    { type: 'file', name: 'baz', extension: 'txt', text: 'baz' },
    { type: 'directory', name: 'foo', contents: [
      { type: 'file', name: 'foo', extension: 'txt', text: 'foo' },
      { type: 'file', name: 'bar', extension: 'txt', text: 'bar' },
      { type: 'file', name: 'baz', extension: 'txt', text: 'baz' },
      { type: 'directory', name: 'foobar', contents: [
        { type: 'file', name: 'foo', extension: 'txt', text: 'foo' }
      ]}
    ]}
  ]);

  input = new UI.input('main-input', 'main-list', system);
  input.register();
};
