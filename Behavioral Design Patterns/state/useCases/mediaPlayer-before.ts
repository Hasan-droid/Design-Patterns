//before
class MediaPlayer {
  private state = "STOPPED";
  private currentSong = "";

  play() {
    if (this.state === "STOPPED") {
      console.log("Starting playback...");
      this.state = "PLAYING";
    } else if (this.state === "PAUSED") {
      console.log("Resuming playback...");
      this.state = "PLAYING";
    } else if (this.state === "PLAYING") {
      console.log("Already playing!");
    }
  }

  pause() {
    if (this.state === "PLAYING") {
      console.log("Pausing...");
      this.state = "PAUSED";
    } else if (this.state === "STOPPED") {
      console.log("Nothing to pause!");
    } else if (this.state === "PAUSED") {
      console.log("Already paused!");
    }
  }

  stop() {
    if (this.state === "PLAYING" || this.state === "PAUSED") {
      console.log("Stopping...");
      this.state = "STOPPED";
    } else {
      console.log("Already stopped!");
    }
  }

  // ❌ More scattered state behavior in other methods
  changeVolume(volume: number) {
    if (this.state === "STOPPED") {
      console.log("Can't change volume when stopped");
    } else if (this.state === "PLAYING") {
      console.log(`Volume changed to ${volume}`);
    } else if (this.state === "PAUSED") {
      console.log(`Volume changed to ${volume} (paused)`);
    }
  }

  //etc
}

//client code
const mediaPlayer = new MediaPlayer();
mediaPlayer.play();
mediaPlayer.pause();
mediaPlayer.changeVolume(25);
