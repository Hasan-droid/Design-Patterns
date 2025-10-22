//Command
interface ICommand {
  execute(): void;
  undo(): void;
}

//Command Receiver
class Light {
  public turnOn() {
    console.log("Turn On Light");
  }

  public turnOff() {
    console.log("Turn Off Light");
  }
}

//Concrete Command
//here we encapsulated the turn on method into stand alone class which will be an object in the client code
class TurnOnCommand implements ICommand {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }

  //revert the turn on action
  undo(): void {
    this.light.turnOff();
  }
}

//Concrete Command
class TurnOffCommand implements ICommand {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }

  //revert the turn off action
  undo(): void {
    this.light.turnOn();
  }
}

//Command Invoker
class SimpleRemoteControl {
  private currentCommand!: ICommand;
  private undoCommand!: ICommand;
  private commandQueue: ICommand[] = [];

  public setCommand(command: ICommand) {
    //this is just a mechanism for purpose of this project
    this.undoCommand = this.currentCommand;
    this.currentCommand = command;
    this.commandQueue.push(command);
  }

  buttonWasPressed() {
    if (this.commandQueue.length > 0) {
      const command = this.commandQueue.shift();
      command?.execute();
    }
  }

  undoButtonWasPressed() {
    this.undoCommand.execute();
  }

  hasCommands() {
    return this.commandQueue.length > 0;
  }
}

//Client Code
const remote: SimpleRemoteControl = new SimpleRemoteControl();
const light: Light = new Light();

// Turning on the light
remote.setCommand(new TurnOnCommand(light));
remote.buttonWasPressed();

// Turning off the light
remote.setCommand(new TurnOffCommand(light));
remote.buttonWasPressed();
console.log("undo command...");
remote.undoButtonWasPressed();

//Commands queue
remote.setCommand(new TurnOnCommand(light));
remote.setCommand(new TurnOffCommand(light));

while (remote.hasCommands()) {
  remote.buttonWasPressed();
}
