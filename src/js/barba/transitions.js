import imagesLoaded from 'imagesloaded'
import gsap from 'gsap'
import { homeEnter, homeLaunch } from '../pages/home'
import { smooth, isMobile } from '../utils'
import SplitText from '../SplitText'
import scrollMobile from '../scrollMobile'
import state from '../state'

export default [{
  name: 'main',
  once ({ next }) {
    smooth(next.container)
    const body = document.querySelector('body')
    const preloader = document.querySelector('.preloader')
    const imgLoad = imagesLoaded(body)

    imgLoad.on('progress', function (instance, image) {
      // const result = image.isLoaded ? 'loaded' : 'broken'
      preloader.style.display = 'block'
      body.style.cursor = 'wait'
      // console.log( 'image is ' + result + ' for ' + image.img.src );
    })

    imgLoad.on('done', function (instance) {
      preloader.style.display = 'none'
      body.style.cursor = 'default'
      // console.log( imgLoad.images.length + ' images loaded' );
    })
  },
  beforeEnter ({ next }) {
    smooth(next.container)
    state.scroll.destroy()
    scrollMobile()
  },
  leave (data) {
    if (isMobile.any()) {
      gsap.set(window, { scrollTo: 0 })
    }
    return gsap.to(data.current.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  },
  enter (data) {
    data.current.container.style.display = 'none'
    state.scroll.update()
    return gsap.from(data.next.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  }
}, {
  name: 'projects',
  from: {
    custom: ({ trigger }) => {
      return trigger.classList && trigger.classList.contains('a-hide')
    },
    namespace: ['project']
  },
  beforeEnter ({ next }) {
    const tl = gsap.timeline()
    tl
      .to('.transition-plane', { scaleY: 1, duration: 1.5, ease: 'expo.inOut' }, '+=0.3')
      .to('.transition-flex', { y: '-10%', rotation: 0, duration: 1.5, ease: 'power3.inOut' }, '-=1.5')
      .to('.transition', { clip: 'rect(0vh 100vw 0vh 0vh)', duration: 1.5, ease: 'power3.inOut' }, '-=1.5')
      .set('.transition-plane', { scaleY: 0 })
    state.scroll.destroy()
    smooth(next.container)
  },
  beforeLeave (data) {
    const pn = document.querySelector('.transition-flex span')
    const nb = data.trigger.getAttribute('project-index')
    pn.innerHTML = nb
    const tl = gsap.timeline()
    const text = new SplitText(pn, { type: 'chars' }); const letters = text.chars
    gsap.set('.transition', { clip: 'rect(100vh 100vw 100vh 0vh)' })
    gsap.set('.transition-flex', { rotation: -6, scale: 1.2, autoAlpha: 0.8, y: '0%' })
    gsap.set(letters[1], { y: '15%', autoAlpha: 0 })
    tl
      .to('.transition', { clip: 'rect(0vh 100vw 100vh 0vh)', duration: 1.5, ease: 'expo.inOut' })
      .to('.transition-flex', { rotation: 0, scale: 1, autoAlpha: 1, duration: 2, ease: 'power3.inOut' }, '-=1.5')
      .to(letters[1], { y: '0%', duration: 1.5, autoAlpha: 1, ease: 'power4.inOut' }, '-=1.5')
  },
  leave (data) {
    return gsap.to(data.current.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  },
  enter (data) {
    data.current.container.style.display = 'none'
    state.scroll.update()
    return gsap.from(data.next.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  }
}, {
  name: 'home-to-about',
  from: { namespace: ['home', 'project'] },
  to: { namespace: ['about'] },
  beforeEnter ({ next }) {
    const tl = gsap.timeline()
    tl
      .to('.transition-plane', { scaleY: 1, duration: 1.5, ease: 'expo.inOut' }, '+=0.3')
      .to('.transition-flex', { y: '-10%', rotation: 0, duration: 1.5, ease: 'power3.inOut' }, '-=1.5')
      .to('.transition', { clip: 'rect(0vh 100vw 0vh 0vh)', duration: 1.5, ease: 'power3.inOut' }, '-=1.5')
      .add(scrollMobile())
      .set('.transition-plane', { scaleY: 0 })
    state.scroll.destroy()
    smooth(next.container)
  },
  beforeLeave (data) {
    const pn = document.querySelector('.transition-flex span')
    pn.innerHTML = 'A-M'
    const tl = gsap.timeline()
    const text = new SplitText(pn, { type: 'chars' }); const letters = text.chars
    gsap.set('.transition', { clip: 'rect(100vh 100vw 100vh 0vh)' })
    gsap.set('.transition-flex', { rotation: -6, scale: 1.2, autoAlpha: 0.8, y: '0%' })
    gsap.set(letters[0], { y: '15%', autoAlpha: 0 })
    gsap.set(letters[2], { y: '-15%', autoAlpha: 0 })
    tl
      .to('.transition', { clip: 'rect(0vh 100vw 100vh 0vh)', duration: 1.5, ease: 'expo.inOut' })
      .to('.transition-flex', { rotation: 0, scale: 1, autoAlpha: 1, duration: 2, ease: 'power3.inOut' }, '-=1.5')
      .to(letters[0], { y: '0%', duration: 1.5, autoAlpha: 1, ease: 'power4.inOut' }, '-=1.5')
      .to(letters[2], { y: '0%', duration: 1.5, autoAlpha: 1, ease: 'power4.inOut' }, '-=1.4')
  },
  leave (data) {
    return gsap.to(data.current.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  },
  enter (data) {
    data.current.container.style.display = 'none'
    state.scroll.update()
    return gsap.from(data.next.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  }
}, {
  name: 'to-home',
  to: { namespace: ['home'] },
  once ({ next }) {
    smooth(next.container)
    const body = document.querySelector('body')
    const preloader = document.querySelector('.preloader')
    const imgLoad = imagesLoaded(body)

    imgLoad.on('progress', function (instance, image) {
      // var result = image.isLoaded ? 'loaded' : 'broken'
      preloader.style.display = 'block'
      body.style.cursor = 'wait'
    })

    imgLoad.on('done', function (instance) {
      preloader.style.display = 'none'
      body.style.cursor = 'default'
      homeLaunch()
    })
  },
  beforeEnter ({ next }) {
    state.scroll.destroy()
    smooth(next.container)
    scrollMobile()
    homeEnter()
  },
  leave (data) {
    return gsap.to(data.current.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  },
  enter (data) {
    data.current.container.style.display = 'none'
    state.scroll.update()
    return gsap.from(data.next.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  }
}, {
  name: 'projects',
  from: { namespace: ['home'] },
  to: { namespace: ['project'] },
  once ({ next }) {
    smooth(next.container)
  },
  beforeEnter ({ next }) {
    const tl = gsap.timeline()
    tl
      .to('.transition-plane', { scaleY: 1, duration: 1.5, ease: 'expo.inOut' }, '+=0.3')
      .to('.transition-flex', { y: '-10%', rotation: 0, duration: 1.5, ease: 'power3.inOut' }, '-=1.5')
      .to('.transition', { clip: 'rect(0vh 100vw 0vh 0vh)', duration: 1.5, ease: 'power3.inOut' }, '-=1.5')
      .add(scrollMobile())
      .set('.transition-plane', { scaleY: 0 })
    state.scroll.destroy()
    smooth(next.container)
  },
  beforeLeave (data) {
    const pn = document.querySelector('.transition-flex span')
    const nb = data.trigger.getAttribute('project-index')
    pn.innerHTML = nb
    const tl = gsap.timeline()
    const text = new SplitText(pn, { type: 'chars' }); const letters = text.chars
    gsap.set('.transition', { clip: 'rect(100vh 100vw 100vh 0vh)' })
    gsap.set('.transition-flex', { rotation: -6, scale: 1.2, autoAlpha: 0.8, y: '0%' })
    gsap.set(letters[1], { y: '15%', autoAlpha: 0 })
    tl
      .to('.transition', { clip: 'rect(0vh 100vw 100vh 0vh)', duration: 1.5, ease: 'expo.inOut' })
      .to('.transition-flex', { rotation: 0, scale: 1, autoAlpha: 1, duration: 2, ease: 'power3.inOut' }, '-=1.5')
      .to(letters[1], { y: '0%', duration: 1.5, autoAlpha: 1, ease: 'power4.inOut' }, '-=1.3')
  },
  leave (data) {
    return gsap.to(data.current.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  },
  enter (data) {
    data.current.container.style.display = 'none'
    state.scroll.update()
    return gsap.from(data.next.container, { opacity: 0, duration: 1, ease: 'power3.inOut' })
  }
}]
