import gsap from 'gsap'
import SplitText from '../SplitText'
import { isMobile } from '../utils'
import state from '../state'

export function projectLaunch () {
  const title = new SplitText('.project-title', { type: 'words' }); const words = title.words
  // const type = new SplitText('.type', { type: 'lines' })
  const tl = gsap.timeline()
  // const appear = gsap.timeline({ paused: true })

  tl
    .fromTo(words, { y: '100%', autoAlpha: 0 }, { y: '0%', autoAlpha: 1, duration: 1.6, ease: 'power3.out', stagger: 0.15 }, '+=0.8')
    .to('.line', { scaleX: 1, duration: 1.8, ease: 'expo.inOut' }, '-=1.2')
    .fromTo('.date, .type, .number, .infos-title, .infos-content', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 }, '-=1')
    .fromTo('.image-cover img', { scale: 1.4, autoAlpha: 0 }, { scale: 1.2, autoAlpha: 1, duration: 1.5, ease: 'power3.inOut' }, '-=1.3')
}

export function projectScroll () {
  // gsap.set('[data-scroll-call="appear"]', {scale:1.2, opacity:0})

  const textHover = gsap.timeline({ paused: true })
  const mainTL = gsap.timeline({ paused: true })

  for (const char of state.projectNumber.chars) {
    const speed = 2
    const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
    const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1.4) * speed, 2)
    const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())

    textHover.to(char, { opacity: 0, duration }, time)

    if (Math.random() > 0.9) {
      textHover.fromTo(char, { opacity: 1, duration }, { opacity: 0, duration }, time + duration)
    }
  }

  mainTL
    .add(textHover)
    .to(textHover, { duration: 2, progress: 1.2, ease: 'power3.in' })

  state.nextProject.addEventListener('mouseenter', () => {
    // textHover.reverse(1.5)
    mainTL.reverse(0)
  })

  state.nextProject.addEventListener('mouseleave', () => {
  })

  if (isMobile.any() === null) {
    for (const img of state.projectImgs) {
      gsap.set(img, { scale: 1.1, opacity: 0 })
    }

    for (const text of state.projectTexts) {
      const splitText = new SplitText(text, { type: 'lines', linesClass: 'lines' })
      gsap.set(splitText.lines, { y: '70%', opacity: 0 })
    }

    state.scroll.on('call', function (event, element, i) {
      if (event === 'appear') {
        gsap.to(i.el, { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' })
      }

      if (event === 'video') {
        i.el.play()
        gsap.to(i.el, { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' })
      }

      if (event === 'text') {
        const text = i.el.querySelectorAll('.lines')
        gsap.to(text, { y: '0%', opacity: 1, duration: 1.5, stagger: 0.1, ease: 'power3.out' })
      }
    })
  }
}
