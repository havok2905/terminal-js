var System,
    commands,
    command;

/*
 * System class maintains working and master versions of the mocked file system
 * and provides an interface for which to interact with it. It parses input,
 * executes commands, and maintains files.
 */

System = function(contents) {
  this.tree = new Directory('~', null, null, contents); // Master cached copy of file system
  this.working = new Directory('~', null, null, contents); // Working directory for reference
};


/*
 * Check if the given path can take you to a file or directory.
 * If yes, then return it, otherwise return false.
 */

System.prototype.traverse = function(target) {

};


/*
 * Interface for user commands
 */

System.prototype.exec = function(command, argument) {
  switch(command) {
    case 'help':
      return Command.commands;
    case 'ls':
      return Command.ls(this.working);
      break;
    case 'pwd':
      return Command.pwd(this.working);
      break;
    case 'cd':
      this.working = Command.cd(this.working, argument);
      return this.working;
      break;
    case 'cat':
      return Command.cat(this.working, argument);
      break;
    case 'grep':
      return Command.grep(this.working);
      break;
    default:
      return false;
  }
};


/*
 * Provide an interface for testing the parse function.
 * This will probably be taken out as more of this simulator
 * is filled out.
 */

System.prototype.parse = function(input) {
  commands = [];
  command = new Command(null, [], [], null);

  input.split(' ').forEach(function(item) {
    if(item.match(/^-/)) {
      item = item.substr(1).split('');
      item.forEach(function(flag) {
        command.flags.push(flag);
      })
    }
    else if(Command.exists(item)) {
      command.command = item;
    }
    else if(item !== '&&' && item !== '|') {
      command.arguments.push(item);
    }
    else {
      command.after = item;
      commands.push(command);
      command = new Command(null, [], [], null);
    }
  });

  commands.push(command);
  command = new Command(null, [], [], null);

  return commands;
}
