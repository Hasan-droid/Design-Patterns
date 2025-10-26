interface LightState {
  switchState(LightSwitch: LightSwitch): void;
}

class OnState implements LightState {
  switchState(LightSwitch: LightSwitch): void {
    console.log("Light is already on , turning off...");
    LightSwitch.setState(new OffState());
  }
}
class OffState implements LightState {
  switchState(LightSwitch: LightSwitch): void {
    console.log("Light is already off , turning on...");
    LightSwitch.setState(new OnState());
  }
}

class LightSwitch {
  constructor(private lightState: LightState) {}

  setState(state: LightState) {
    //set state of class
    this.lightState = state;
  }

  press() {
    //change behavior of class
    this.lightState.switchState(this);
  }
}

const lightSwitch = new LightSwitch(new OffState());
lightSwitch.press();

export {};
