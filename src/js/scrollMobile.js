import { isMobile } from './utils'
import gsap from 'gsap'

export default function scrollMobile () {
  if (isMobile.any()) {
    gsap.to(window, { scrollTo: 0, duration: 0.1 })
  }
}
