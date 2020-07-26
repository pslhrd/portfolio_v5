import Smooth from 'smooth-scrolling'
import Custom from './custom'
import SplitText from './SplitText'
import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.1,
    firefoxMultiplier: 50,
    touchMultiplier: 2,
})

scroll.on('call', function(event, element, i){
  "appear" === event && document.querySelector('.description-nb-first').classList.add('done')
  "appear2" === event && document.querySelector('.description-nb-sec').classList.add('done')
})

const mySplitText = new SplitText(".main-project-text", {type:"chars, words"}),
    tl = gsap.timeline(),
    numChars = mySplitText.chars.length;

for(var i = 0; i < numChars; i++){
  //random value used as position parameter
  tl.from(mySplitText.chars[i], {opacity:0, duration:0.125}, Math.random() * 0.8);
}

// tl
//   .from('.main-project-img img', {duration: 4, ease:'power1.out', autoAlpha:0})
//   .from('.main-project-img', {duration:3, ease:'expo.inOut', width:'100vw', height:'140vh', top:'0', left:'0'}, 2)

