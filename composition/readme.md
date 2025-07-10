# composition is structural design pattern

- **Component** : interface this has the main methods that each child perform

- **Leaf** : this the schema of a child (element) , this has no children

- **Composite** : this is the parent of a composition , it implements component interface so it's basically has all methods of children PLUS it has additional methods that performs on the whole composite
  ![composite tree](image.png)

## Uses

- when you have parent object that has nested objects

- when you want to perform a certain tasks on many objects as one individual object

## Advantages

- easy fit to structural components
- easy to add new components as long as they implement`interface Component`
- allows customer to treat individual objects and composite uniformly

## DisAdvantages

- Violates Single Responsibility Principle

```typeScript
class Folder implements CompositionFileSystemComponent {

  //it do some certain works on folders like

    getName(): string {
    return this.name;
  }

  //but it do's operation on subFolders as well  like

 removeComponent(component: FileSystemComponent): void {
    this.components.splice(this.components.indexOf(component), 1);
  }

```

- Indirect Coupling

```typeScript
interface FileSystemComponent {
  getSize(): number;
}

class Folder implements CompositionFileSystemComponent {

  protected components: FileSystemComponent[] = [];
  //code


   getSize(): number {
    return this.components.reduce(
      (total, component) => total + component.getSize(),
      0
    );
  }

    //rest of code

    /**
     * Any change with the interface  FileSystemComponent
     * would directly affect getSize()
     *
     * case 2 : Any odd with the number of the output , would need to check all components
     * **/

```

- Type Checking

```typeScript
interface FileSystemComponent {
//code
}

interface CompositionFileSystemComponent extends FileSystemComponent {
  //code
}

class CustomFile implements FileSystemComponent {
  //code
}

class Folder implements CompositionFileSystemComponent {
  //code
}

/**
 * it's hard to check whether the object is a file or folder as long as they implement FileSystemComponent
 *
 * case 2 : if wanted to prevent certain types of folders
 * to be included in another folder from Folder class , there's almost no integrate solution
 **/


```

## Use Cases

- **Hierarchical Components** like GUI, FileSystem, and companies employees
