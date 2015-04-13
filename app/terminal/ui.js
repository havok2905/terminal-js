var UI = {};

UI.input = function(inputId, listId, system) {
  this.inputId = inputId;
  this.listId = listId;
  this.system = system;
  this.input = document.getElementById(this.inputId);
  this.list = document.getElementById(this.listId);
};

UI.input.prototype.register = function() {
  this.input.addEventListener('keypress', this.submitEvent.bind(this));
};

UI.input.prototype.submitEvent = function(event) {
  var commands, result;

  if(event.keyCode === 13) {
    this.system.history.push(this.input.value);
    commands = this.system.parse(this.input.value);
    result = this.system.run(commands);
    if(typeof result === 'string') {
      this.addToScreen(result);
    }

    this.input.value = '';
  }
};

UI.input.prototype.addToScreen = function(input) {
  var li = document.createElement('li'),
      liText = document.createTextNode(input);

  li.appendChild(liText);
  this.list.appendChild(li);
};
