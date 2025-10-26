class LightSwitch {
  private isOn = false;

  press() {
    if (this.isOn) {
      console.log("Light is already on, turning off ...");
      this.isOn = false;
    } else {
      console.log("Light is already off, turning on ...");
      this.isOn = true;
    }
  }
}

const lightSwitch = new LightSwitch();
lightSwitch.press();
lightSwitch.press();

export {};
