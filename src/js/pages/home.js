import gsap from 'gsap'
import SplitText from '../SplitText'
import { isMobile } from '../utils'
import state from '../state'

export function homeEnter () {
  const mySplitText = new SplitText('.main-project-text', { type: 'chars, words' }); const chars = mySplitText.chars
  const mainText = gsap.timeline({ paused: true })

  const tl = gsap.timeline()

  for (const char of chars) {
    const speed = 2
    const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
    const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1.4) * speed, 2)
    const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())

    mainText.from(char, { opacity: 0, duration }, time)

    if (Math.random() > 0.75) {
      mainText.fromTo(char, { opacity: 0, duration }, { opacity: 1, duration }, time + duration)
    }
  }

  tl
    .fromTo('.main-project-img img', { scale: 1.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, rotation: 0, ease: 'power3.out', duration: 2 })
    .add(mainText.play(), '-=1.8')
    .fromTo('.cross', { rotation: -25, opacity: 0 }, { rotation: 0, opacity: 1, duration: 2, ease: 'power3.out' }, '-=1.3')
}

export function homeLaunch () {
  const mySplitText = new SplitText('.main-project-text', { type: 'chars, words' })
  const chars = mySplitText.chars

  const mainText = gsap.timeline({ paused: true })

  state.scroll.stop()

  for (const char of chars) {
    const speed = 2
    const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
    const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1.4) * speed, 2)
    const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())

    mainText.from(char, { opacity: 0, duration }, time)

    if (Math.random() > 0.75) {
      mainText.fromTo(char, { opacity: 0, duration }, { opacity: 1, duration }, time + duration)
    }
  }

  const tl = gsap.timeline()
  const introText = document.querySelectorAll('.logo, .about, .dark')
  const a = document.querySelector('.m3')

  a.style.pointerEvents = 'none'

  if (isMobile.any()) {
    tl
      .set('.cross', { opacity: 0 })
      .from('.main-project-img img', { duration: 4, ease: 'power3.out', scale: 1.15 })
      .from('.main-project-img img', { duration: 4, ease: 'power1.out', autoAlpha: 0 }, '-=4')
      .from('.main-project-img', { duration: 2.3, ease: 'expo.inOut', width: '102vw', height: '100vh', top: '-10px', left: '0' }, 2)
      .add(function () { state.scroll.start() }, '-=1')
      .fromTo(introText, { opacity: 0 }, { y: '0px', opacity: 1, duration: 0.2, ease: 'power3.out', stagger: 0.2 }, '-=1.4')
      .fromTo('header .line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power4.out', onComplete: function () { a.style.pointerEvents = 'all' } }, '-=0.8')
      .add(mainText.play(), '-=2')
      .fromTo('.cross', { rotation: -25, opacity: 0 }, { rotation: 0, opacity: 1, duration: 2, ease: 'power3.out' }, '-=1.6')
  } else {
    tl
      .set('.cross', { opacity: 0 })
      .from('.main-project-img img', { duration: 4, ease: 'power3.out', scale: 1.15 })
      .from('.main-project-img img', { duration: 4, ease: 'power1.out', autoAlpha: 0 }, '-=4')
      .from('.main-project-img', { duration: 2.6, ease: 'expo.inOut', width: '102vw', height: '70vw', top: '-10px', left: '0' }, 2)
      .add(function () { state.scroll.start() }, '-=1')
      .fromTo(introText, { opacity: 0 }, { y: '0px', opacity: 1, duration: 0.2, ease: 'power3.out', stagger: 0.2 }, '-=1.4')
      .fromTo('header .line', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power4.out', onComplete: function () { a.style.pointerEvents = 'all' } }, '-=0.8')
      .add(mainText.play(), '-=2')
      .fromTo('.cross', { rotation: -25, opacity: 0 }, { rotation: 0, opacity: 1, duration: 2, ease: 'power3.out' }, '-=1.6')
  }
}

export function homeScroll () {
  const as = document.querySelectorAll('a')

  for (const a of as) {
    a.addEventListener('mouseenter', () => {
      gsap.set(a, { transformOrigin: 'right' })
    })

    a.addEventListener('mouseleave', () => {
      gsap.set(a, { transformOrigin: 'left' })
    })
  }

  let desc
  const line = document.querySelector('.description .line span')
  // const project = gsap.timeline({ paused: true })

  function makeid (length) {
    let result = ''
    const characters = '…………………………………… ………………………………………………………………………………………………………:. ;.'
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  line.innerHTML = makeid(250)

  function lettersHover () {
    desc = new SplitText('.description-text', { type: 'chars, words' })
    const letters = desc.chars

    for (const letter of letters) {
      const tl = gsap.timeline()
      letter.addEventListener('mouseenter', () => {
        const rand = letters[Math.floor(Math.random() * letters.length)]
        tl
          .set(rand, { opacity: 0 })
          .to(rand, { opacity: 1, duration: 0.01, ease: 'power1.out' }, '+=1.2')
      })
    }
  }
  lettersHover()

  function projectHover () {
    const projects = document.querySelectorAll('.project')

    projects.forEach(function (element, index) {
      const textHover = gsap.timeline({ paused: true })
      const content = element.querySelector('.project-text')
      const text = new SplitText(content, { type: 'chars' })
      const chars = text.chars

      for (const char of chars) {
        const speed = 2
        const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
        const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1.4) * speed, 2)
        const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())

        textHover.from(char, { opacity: 0, duration }, time)

        if (Math.random() > 0.9) {
          textHover.fromTo(char, { opacity: 0, duration }, { opacity: 1, duration }, time + duration)
        }
      }
      element.addEventListener('mouseenter', () => {
        textHover.play()
      })

      element.addEventListener('mouseleave', () => {
        textHover.reverse(1.3)
      })
    })
  }
  projectHover()

  const node = document.createElement('span')
  const textnode = document.createTextNode('(Currently looking for an internship.)')
  node.appendChild(textnode)
  node.classList.add('internship')

  desc.words[0].appendChild(node)
}
