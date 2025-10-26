/*eslint-disable @typescript-eslint/no-unused-vars */
interface PlayerState {
  play(player: MediaPlayer): void;
  pause(player: MediaPlayer): void;
  stop(player: MediaPlayer): void;
}

// ✅ All PLAYING behavior in one place
class PlayingState implements PlayerState {
  play(player: MediaPlayer): void {
    console.log("Already playing!");
  }

  pause(player: MediaPlayer): void {
    console.log("Pausing...");
    player.setState(new PausedState());
  }

  stop(player: MediaPlayer): void {
    console.log("Player Stopped");
    player.setState(new StoppedState());
  }
}

// ✅ All PAUSED behavior in one place
class PausedState implements PlayerState {
  play(player: MediaPlayer): void {
    console.log("Resuming playback...");
    player.setState(new PlayingState());
  }

  pause(player: MediaPlayer): void {
    console.log("Already paused!");
  }

  stop(player: MediaPlayer): void {
    console.log("Stopping...");
    player.setState(new StoppedState());
  }
}

// ✅ All STOPPED behavior in one place
class StoppedState implements PlayerState {
  play(player: MediaPlayer): void {
    console.log("Starting playback...");
    player.setState(new PlayingState());
  }

  pause(player: MediaPlayer): void {
    console.log("Nothing to pause!");
  }

  stop(player: MediaPlayer): void {
    console.log("Already stopped!");
  }
}

class MediaPlayer {
  private state: PlayerState;

  constructor() {
    this.state = new StoppedState();
  }

  setState(newState: PlayerState) {
    this.state = newState;
  }

  // ✅ Clean delegation - no scattered if/else statements
  play() {
    this.state.play(this);
  }
  pause() {
    this.state.pause(this);
  }
  stop() {
    this.state.stop(this);
  }
}

//client code
const mediaPlayer = new MediaPlayer();

mediaPlayer.play();

export {};
