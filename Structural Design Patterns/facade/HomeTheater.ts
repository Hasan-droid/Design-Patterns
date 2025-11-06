class Amplifier {
  turnOn() {
    console.log("Turn On Amplifier");
  }

  setVolume(level: number): void {
    console.log(`Volume is on ${level}`);
  }
}

class DvdPlayer {
  turnOn() {
    console.log("Turn On DvdPlayer");
  }

  play(movie: string): void {
    console.log(`Play movie: ${movie}`);
  }
}
class Projector {
  turnOn() {
    console.log("Turn On Projector");
  }

  setInput(dvdPlayer: DvdPlayer): void {
    console.log("The DVD Player is tuned on");
  }
}

class Lights {
  dim(level: number): void {
    console.log(`lights level ${level}`);
  }
}

class HomeTheaterFacade {
  constructor(
    private amplifier: Amplifier,
    private dvdPlayer: DvdPlayer,
    private projector: Projector,
    private lights: Lights
  ) {}

  public watchMovie(movie: string, volume: number, level: number) {
    console.log(`Get Ready To Watch ${movie}`);
    this.lights.dim(level);
    this.amplifier.turnOn();
    this.amplifier.setVolume(volume);
    this.dvdPlayer.turnOn();
    this.projector.turnOn();
    this.projector.setInput(this.dvdPlayer);
    this.dvdPlayer.play(movie);
  }
}

// Client Code
const amplifier = new Amplifier();
const dvdPlayer = new DvdPlayer();
const projector = new Projector();
const lights = new Lights();

const homeTheater = new HomeTheaterFacade(
  amplifier,
  dvdPlayer,
  projector,
  lights
);

homeTheater.watchMovie("Inception", 10, 5);
