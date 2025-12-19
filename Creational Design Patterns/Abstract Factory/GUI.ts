interface IButton {
  render(): void;
  onClick(): void;
}

interface ICheckbox {
  render(): void;
  onCheck(): void;
}

interface IGUIFactory {
  createButton(): IButton;
  createCheckbox(): ICheckbox;
}

class WindowsButton implements IButton {
  render(): void {
    console.log("Rendering Windows Button");
  }
  onClick(): void {
    console.log("Windows Button Clicked");
  }
}

class WindowsCheckbox implements ICheckbox {
  render(): void {
    console.log("Rendering Windows Checkbox");
  }
  onCheck(): void {
    console.log("Windows Checkbox Checked");
  }
}

class MacOSButton implements IButton {
  render(): void {
    console.log("Rendering MacOS Button");
  }
  onClick(): void {
    console.log("MacOS Button Clicked");
  }
}

class MacOSCheckbox implements ICheckbox {
  render(): void {
    console.log("Rendering MacOS Checkbox");
  }
  onCheck(): void {
    console.log("MacOS Checkbox Checked");
  }
}

class WindowsFactory implements IGUIFactory {
  createButton(): IButton {
    return new WindowsButton();
  }
  createCheckbox(): ICheckbox {
    return new WindowsCheckbox();
  }
}

class MacOSFactory implements IGUIFactory {
  createButton(): IButton {
    return new MacOSButton();
  }
  createCheckbox(): ICheckbox {
    return new MacOSCheckbox();
  }
}

function clientCode(factory: IGUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  button.render();
  button.onClick();
  checkbox.render();
  checkbox.onCheck();
}

// Usage
const os: string = "Windows"; // This could be determined dynamically
let factory: IGUIFactory;
if (os === "Windows") {
  factory = new WindowsFactory();
} else {
  factory = new MacOSFactory();
}
clientCode(factory);
