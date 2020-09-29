import { ScrollToPlugin } from 'gsap/all'
import gsap from 'gsap'
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import transitions from './js/barba/transitions'
import views from './js/barba/views'
import scrollMobile from './js/scrollMobile'

gsap.registerPlugin(ScrollToPlugin)

// if (isMobile.any() === null) {
//   console.log('Not Mobile')
// } else {
//   console.log(isMobile.any())
// }

barba.use(barbaPrefetch)

barba.init({
  debug: false,
  transitions,
  views
})

barba.hooks.enter(() => {
  scrollMobile()
})
