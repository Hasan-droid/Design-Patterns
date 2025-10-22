interface ICommand {
  execute(): void;
  undo(): void;
}

class CreateFileCommand implements ICommand {
  constructor(private path: string) {}

  execute(): void {
    console.log(`create file to path ${this.path}`);
  }

  undo(): void {
    console.log(`Delete File to path ${this.path}`);
  }
}

class DeleteFileCommand implements ICommand {
  constructor(private path: string) {}

  execute(): void {
    console.log(`delete path ${this.path}`);
  }

  undo(): void {
    console.log(`undo delete path ${this.path}`);
  }
}

class ReadFileCommand implements ICommand {
  constructor(private path: string) {}

  execute(): void {
    console.log(`read file from path ${this.path}`);
  }

  undo(): void {
    console.log(`Action is not available`);
  }
}

class UpdateFileCommand implements ICommand {
  constructor(
    private filePath: string,
    private oldContent: string,
    private newContent: string
  ) {}

  execute(): void {
    console.log(
      `update file at ${this.filePath} with new content ${this.newContent}`
    );
  }

  undo() {
    console.log(
      `Reverting file at ${this.filePath} to old content: ${this.oldContent}`
    );
    // Here would be logic for reverting the file back to the old content
  }
}

class MyFileSystem {
  private commandQueue: ICommand[] = [];

  addCommand(command: ICommand): void {
    this.commandQueue.push(command);
  }

  executeCommand(): void {
    //execute first element
    if (this.commandQueue.length > 0) {
      const command = this.commandQueue.shift();

      command?.execute();
    }
  }

  undoCommand(): void {
    //undo last element
    if (this.commandQueue.length > 0) {
      const command = this.commandQueue.pop();
      command?.undo();
    }
  }

  hasCommands(): boolean {
    return this.commandQueue.length > 0;
  }
}

//client code

const myFileSystem = new MyFileSystem();
myFileSystem.addCommand(new CreateFileCommand("c/file/smart.txt"));
myFileSystem.addCommand(new DeleteFileCommand("c:/files/ai.json"));
myFileSystem.executeCommand();
myFileSystem.undoCommand();
