/* eslint-disable node/no-callback-literal */
// import {SOUND_PHAT_AM} from '@configs/constant';
import { Platform } from "react-native"
import Sound from "react-native-sound"

class MediaManager {
  sound: any
  backgroundMusic: any
  clockBackground: any

  state: { stateStop: boolean }

  constructor() {
    this.sound = null
    this.backgroundMusic = null
    this.clockBackground = null
    this.state = {
      stateStop: false,
    }
  }

  setState(arg0: { stateStop: any }) {
    this.state.stateStop = arg0.stateStop
  }

  onPlayBack(url: string, isLocal = true) {
    if (!url) {
      return
    }
    if (!this.sound) {
      return new Promise((resolve, reject) => {
        this.initSound(url, isLocal, (status: boolean) => {
          if (status === true && !this.state.stateStop) {
            this.sound.setNumberOfLoops(-1)
            this.sound.play(() => {
              this.sound?.release()
              resolve(true)
            })
          } else {
            reject(status)
          }
        })
      })
    }
    this.sound.stop()?.release()
    this.sound = null
    return this.onPlayBack(url)
  }

  onPlay(url: string, isLocal?: any) {
    if (!url) {
      return
    }
    if (!this.sound) {
      return new Promise((resolve, reject) => {
        this.initSound(url, isLocal, (status: boolean) => {
          if (status === true && !this.state.stateStop) {
            // this.sound.setSpeed(1.5);
            this.sound.play(() => {
              this.sound?.release()
              resolve(true)
            })
          } else {
            reject(status)
          }
        })
      })
    }
    this.sound?.stop()
    this.sound?.release()
    this.sound = null
    return this.onPlay(url, isLocal)
  }

  onChangeStop = (val) => {
    this.setState({ stateStop: val })
  }

  setSpeed(speed) {
    this.sound && this.sound.setSpeed(speed)
  }

  stop() {
    this.sound && this.sound.stop()
    this.sound && this.sound.release()
  }

  initSound(url: string, isLocal: boolean, callback: (arg) => void) {
    if (!url) {
      return callback(false)
    }
    Sound.setCategory("Playback")
    const mainBundle =
      Platform.OS === "ios"
        ? isLocal
          ? // ? encodeURIComponent(Sound.MAIN_BUNDLE)
            Sound.MAIN_BUNDLE
          : ""
        : Sound.MAIN_BUNDLE
    this.sound = new Sound(url, mainBundle, (error: Error) => {
      if (error) {
        return callback(error)
      }
      return callback(true)
    })
    return false
  }

  initClockBackground(url: string, isLocal: boolean, callback: (arg) => void) {
    if (!url) {
      return callback(false)
    }
    Sound.setCategory("Playback")
    const mainBundle =
      Platform.OS === "ios"
        ? isLocal
          ? // ? encodeURIComponent(Sound.MAIN_BUNDLE)
            Sound.MAIN_BUNDLE
          : ""
        : Sound.MAIN_BUNDLE

    this.clockBackground = new Sound(url, mainBundle, (error: Error) => {
      if (error) {
        return callback(error)
      }
      return callback(true)
    })
    return false
  }

  initMusicBackground(url: string, isLocal: boolean, callback: (arg) => void) {
    if (!url) {
      return callback(false)
    }
    Sound.setCategory("Playback")
    const mainBundle =
      Platform.OS === "ios"
        ? isLocal
          ? // ? encodeURIComponent(Sound.MAIN_BUNDLE)
            Sound.MAIN_BUNDLE
          : ""
        : Sound.MAIN_BUNDLE
    this.backgroundMusic = new Sound(url, mainBundle, (error: Error) => {
      if (error) {
        return callback(error)
      }
      return callback(true)
    })
    return false
  }

  // errorPlay() {
  //   return this.onPlay(SOUND_PHAT_AM.WRONG, true);
  // }

  // averagePlay() {
  //   return this.onPlay(SOUND_PHAT_AM.AVERAGE, true);
  // }

  // chooseCorrect() {
  //   return this.onPlay(SOUND_PHAT_AM.CHOOSE_CORRECT, true);
  // }

  // accomplishmentPlay() {
  //   return this.onPlay(SOUND_PHAT_AM.GREAT, true);
  // }

  // endLessonPlay() {
  //   return this.onPlay(SOUND_PHAT_AM.END_LESSON, true);
  // }

  playMusicBackGround(url: string, isLocal = true) {
    if (!url) {
      return
    }
    if (!this.backgroundMusic) {
      return new Promise((resolve, reject) => {
        this.initMusicBackground(url, isLocal, (status: boolean) => {
          if (status === true && !this.state.stateStop) {
            this.backgroundMusic.setNumberOfLoops(-1)
            this.backgroundMusic.play(() => {
              this.backgroundMusic?.release()
              resolve(true)
            })
          } else {
            reject(status)
          }
        })
      })
    }
    this.backgroundMusic?.stop()
    this.backgroundMusic?.release()
    this.backgroundMusic = null
    return this.playMusicBackGround(url)
  }

  pausedMusicBackground() {
    this.backgroundMusic && this.backgroundMusic?.pause()
  }

  resumeMusicBackground() {
    this.backgroundMusic &&
      this.backgroundMusic?.play(() => {
        this.backgroundMusic?.release()
      })
  }

  stopMusicBackground() {
    this.backgroundMusic && this.backgroundMusic?.stop()
    this.backgroundMusic && this.backgroundMusic?.release()
  }

  playClockBackGround(url: string, isLocal = true) {
    if (!url) {
      return
    }
    if (!this.clockBackground) {
      return new Promise((resolve, reject) => {
        this.initClockBackground(url, isLocal, (status: boolean) => {
          if (status === true && !this.state.stateStop) {
            this.clockBackground.setNumberOfLoops(-1)
            this.clockBackground.play(() => {
              this.clockBackground?.release()
              resolve(true)
            })
          } else {
            reject(status)
          }
        })
      })
    }
    this.clockBackground?.stop()
    this.clockBackground?.release()
    this.clockBackground = null
    return this.playClockBackGround(url)
  }

  pausedClockBackGround() {
    this.clockBackground && this.clockBackground?.pause()
  }

  resumeClockBackGround() {
    this.clockBackground &&
      this.clockBackground?.play(() => {
        this.clockBackground?.release()
      })
  }

  stopClockBackground() {
    this.clockBackground && this.clockBackground?.stop()
    this.clockBackground && this.clockBackground?.release()
  }
}
export default new MediaManager()
