class WindowsVideoPlayer {
  playVideo(): void {
    console.log("play video on windows");
  }
}
class WindowsAudioPlayer {
  playAudio(): void {
    console.log("play audio on windows");
  }
}

class MacVideoPlayer {
  playVideo(): void {
    console.log("play video on mac");
  }
}

class MacAudioPlayer {
  playAudio(): void {
    console.log("play audio on mac");
  }
}

const windowsAudioPlayer = new WindowsAudioPlayer();
windowsAudioPlayer.playAudio();
