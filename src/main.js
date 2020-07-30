import Smooth from 'smooth-scrolling'
import Custom from './custom'
import SplitText from './SplitText'
import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'
import barba from '@barba/core'

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.1,
    firefoxMultiplier: 50,
    touchMultiplier: 2,
})

function aboutLaunch() {
  const tl = gsap.timeline()
  const aText = gsap.timeline({paused: true})
  const aIntro = new SplitText(".a-intro p", {type:"chars, words"}),
      aChars = aIntro.chars;

  const aData = new SplitText(".a-data", {type:"chars"}),
      aNum = aData.chars;

  for (const char of aChars) {
      const speed = 2
      const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
      const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1.4) * speed, 2)
      const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())

      aText.from(char, { opacity:0, duration }, time);

      if (Math.random() > .75) {
          aText.to(char, { opacity:0, duration }, time + duration);
          aText.from(char, { opacity:0, duration }, time + duration);
      }
  }

  tl
  .fromTo(aNum, {y:'100%'}, {y:'0%', duration:1.3, ease:'power3.out', stagger:0.1})
  .add(aText.play(), "-=1.9")
  .fromTo('.a-cross', {rotation:-25, opacity:0}, {rotation:0, opacity:1, duration:2, ease:'power3.out'}, "-=1")
}

// aboutLaunch()

function aboutScroll() {

  const aTitle = new SplitText(".a-title h1", {type:"lines"})
  const aContent = new SplitText(".a-content p", {type:"lines"})

  console.log(aTitle)

  const title = gsap.timeline({paused: true})
  const content = gsap.timeline({paused: true})

  title.fromTo(aTitle.lines, {opacity:0, y:100}, {opacity:1,y:0, duration:1.3, stagger:0.1, ease:'power3.out'})
  content.fromTo(aContent.lines, {opacity:0, y:30}, {opacity:1,y:0, duration:1.3, stagger:0.1, ease:'power3.out'})

  scroll.on('call', function(event, element, i){

    if (event === 'title') {
      title.play()
    }

    if (event === 'content') {
      content.play()
    }
  })
}

// aboutScroll()

function homeScroll(event, element, i) {

  const pointAppear = gsap.timeline({paused: true})
  const pointAppear2 = gsap.timeline({paused: true})
  const appear = gsap.timeline({paused: true})
  const project = gsap.timeline({paused: true})

  gsap.set('[data-scroll-call=project]', {opacity:0, rotation:2, y:'20%'})

  scroll.on('call', function(event, element, i){

    if (event === 'project') {
      projectAppear(i)
    }

    if (event === 'internship') {
      appear.play()
    }
  })

  function projectAppear (i) {
    gsap.to(i.el, {rotation:0,y:'0%', opacity:1, duration:1.3, ease:'power3.out'})
  }

  const Internship = new SplitText(".internship", {type:"chars, words"}), letters = Internship.chars;
  const line = new SplitText(".line", {type:"chars"}), points = line.chars;
  const line2 = new SplitText(".line2", {type:"chars"}), points2 = line2.chars;

  const mainText = new SplitText(".main-project-text", {type:"chars, words"})

  pointAppear.fromTo(points, {opacity:0}, {opacity:1, duration:0.01, stagger:0.01})
  pointAppear2.fromTo(points2, {opacity:0}, {opacity:1, duration:0.01, stagger:0.01})

  appear
  .to(pointAppear,{ duration:2, progress:1, ease:'power4.out'})
  .to(pointAppear2,{ duration:2, progress:1, ease:'power4.out'}, "-=1.9")
  .fromTo('.description-text span', {y:'110%'}, {y:'0%', duration:1.3, ease:'power3.out', stagger:0.15}, "-=1.9")

  for (const letter of letters) {
      const speed = 3
      const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
      const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1) * speed, 2)
      const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())
      appear.to(letter, { opacity:1, duration }, time);

      if (Math.random() > 0) {
          appear.to(letter, { opacity:0, duration }, time + duration);
          appear.from(letter, { opacity:0, duration }, time + duration);
      }
  }
}
// homeScroll()

function homeLaunch() {

  const mySplitText = new SplitText(".main-project-text", {type:"chars, words"}),
      chars = mySplitText.chars;

  const mainText = gsap.timeline({paused: true})

  scroll.stop()

  for (const char of chars) {
      const speed = 2
      const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
      const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1.4) * speed, 2)
      const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())

      mainText.from(char, { opacity:0, duration }, time);

      if (Math.random() > .75) {
          mainText.to(char, { opacity:0, duration }, time + duration);
          mainText.from(char, { opacity:0, duration }, time + duration);
      }
  }

  const tl = gsap.timeline()
  const introText = document.querySelectorAll('.logo, .about, .dark')

  tl
  .set('.cross', {opacity:0})
  .from('.main-project-img img', {duration: 4, ease:'power3.out', scale:1.15})
  .from('.main-project-img img', {duration: 4, ease:'power1.out', autoAlpha:0}, "-=4")
  .from('.main-project-img', {duration:2.6, ease:'expo.inOut', width:'102vw', height:'70vw', top:'-10px', left:'0'}, 2)
  .add(function(){scroll.start()}, "-=1")
  .fromTo(introText, {opacity:0}, {y:'0px',opacity:1, duration:0.2, ease:'power3.out', stagger:0.2}, "-=1.4")
  .fromTo('.line', {scaleX:0}, {scaleX:1, duration:1.2, ease:'power4.out'}, "-=0.8")
  .add(mainText.play(), "-=2")
  .fromTo('.cross', {rotation:-25, opacity:0}, {rotation:0, opacity:1, duration:2, ease:'power3.out'}, "-=1.6")
}

// homeLaunch()