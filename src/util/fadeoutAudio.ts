/* eslint-disable @typescript-eslint/explicit-function-return-type */
const fadeAudioOut = (audioElement: HTMLAudioElement) => {
  let volume = audioElement.volume
  const fadeOutInterval = setInterval(() => {
    if (volume > 0.1) {
      volume -= 0.1
      audioElement.volume = volume
    } else {
      clearInterval(fadeOutInterval)
      audioElement.pause()
      audioElement.volume = 1 // 볼륨을 원래대로 되돌립니다.
    }
  }, 50) // 50ms마다 볼륨 감소
}

export default fadeAudioOut
