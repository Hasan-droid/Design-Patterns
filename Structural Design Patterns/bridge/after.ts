interface mediaPlayerImplmentaion {
  playVideo(): void;
  playAudio(): void;
}

class WindowsMediaPlayer implements mediaPlayerImplmentaion {
   playAudio(): void {
    console.log("play audio on windows");
  }
   playVideo(): void {
    console.log("play video on windows");
  }
}
class MacOsMediaPlayer implements mediaPlayerImplmentaion {
  playAudio(): void {
    console.log("play audio on Mac");
  }
  playVideo(): void {
    console.log("play video on Mac");
  }
}

abstract class mediaPlayerAbstraction {
  constructor(protected mediaPlayer: mediaPlayerImplmentaion) {}

  abstract playFile(): void;
}

class AudioPlayer extends mediaPlayerAbstraction {
  playFile(): void {
    this.mediaPlayer.playAudio();
  }
}
class VideoPlayer extends mediaPlayerAbstraction {
  playFile(): void {
    this.mediaPlayer.playVideo();
  }
}

const audioPlayer = new AudioPlayer(new WindowsMediaPlayer());
audioPlayer.playFile();
