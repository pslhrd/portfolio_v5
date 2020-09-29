import gsap from 'gsap'
import SplitText from '../SplitText'

export function aboutLaunch () {
  const tl = gsap.timeline()
  const aText = gsap.timeline({ paused: true })
  const aIntro = new SplitText('.a-intro p', { type: 'chars, words' })
  const aChars = aIntro.chars

  const aData = new SplitText('.a-data', { type: 'chars' })
  const aNum = aData.chars

  for (const char of aChars) {
    const speed = 2
    const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
    const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1.4) * speed, 2)
    const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())

    aText.from(char, { opacity: 0, duration }, time)

    if (Math.random() > 0.75) {
      aText.fromTo(char, { opacity: 0, duration }, { opacity: 1, duration }, time + duration)
    }
  }

  tl
    .fromTo(aNum, { y: '100%', autoAlpha: 0 }, { autoAlpha: 1, y: '0%', duration: 1.6, ease: 'power3.out', stagger: 0.15 }, '+=0.6')
    .add(aText.play(), '-=1.8')
    .fromTo('.a-cross', { rotation: -25, opacity: 0 }, { rotation: 0, opacity: 1, duration: 2, ease: 'power3.out' }, '-=0.9')
}
