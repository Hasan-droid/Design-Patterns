//component
interface FileSystemComponent {
  getName(): string;
  getSize(): number;
}

//leaf
class CustomFile implements FileSystemComponent {
  constructor(protected name: string, protected size: number) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }
}

//composite
interface CompositionFileSystemComponent extends FileSystemComponent {
  addComponent(component: FileSystemComponent): void;
  removeComponent(component: FileSystemComponent): void;
  getComponents(): FileSystemComponent[];
}

class Folder implements CompositionFileSystemComponent {
  protected components: FileSystemComponent[] = [];
  constructor(protected name: string) {}
  getName(): string {
    return this.name;
  }

  getComponents(): FileSystemComponent[] {
    return this.components;
  }
  addComponent(component: FileSystemComponent): void {
    this.components.push(component);
  }

  getSize(): number {
    return this.components.reduce(
      (total, component) => total + component.getSize(),
      0
    );
  }

  removeComponent(component: FileSystemComponent): void {
    this.components.splice(this.components.indexOf(component), 1);
  }
}

const file1 = new CustomFile("hasan.txt", 2);
const file2 = new CustomFile("hasan2.txt", 2);

const folder = new Folder("new folder");

folder.addComponent(file1);
folder.addComponent(file2);

console.log(folder.getSize());
