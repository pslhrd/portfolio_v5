import SplitText from './SplitText'
import { ScrollToPlugin } from 'gsap/all'
import gsap from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import Cursor from './cursor'
import imagesLoaded from 'imagesloaded'

gsap.registerPlugin(ScrollToPlugin)

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}

let scroll;

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
          aText.fromTo(char, { opacity:0, duration }, { opacity:1, duration }, time + duration);
      }
  }

  tl
  .fromTo(aNum, {y:'100%', autoAlpha:0}, {autoAlpha:1, y:'0%', duration:1.6, ease:'power3.out', stagger:0.15}, "+=0.6")
  .add(aText.play(), "-=1.8")
  .fromTo('.a-cross', {rotation:-25, opacity:0}, {rotation:0, opacity:1, duration:2, ease:'power3.out'}, "-=0.9")
}

function aboutScroll() {

  let img;
  const cursor = new Cursor(document.querySelector('.cursor'))
  const inner = document.querySelectorAll('.cursor-inner-1, .cursor-inner-2, .cursor-inner-3')
  const wrapper = document.querySelector('.cursor-wrapper')
  const tl = gsap.timeline()
  const data = document.querySelectorAll('.a-data-n1, .a-data-n2, .a-data-n3')
  console.log(data)

  data.forEach(function (element, index) {
    const tl = gsap.timeline()
    element.addEventListener('mouseenter', () => {
      tl
      .set(inner[index], {display:'block'})
      .fromTo(inner[index], {autoAlpha:0}, {scale:1, autoAlpha:1, duration:0.1})
    })
     element.addEventListener('mouseleave', () => {
      tl
      .fromTo(inner[index], {autoAlpha:1}, {autoAlpha:0, duration:0.1})
      .set(inner[index], {display:'none'})
    })
  })

  scroll.on('call', function(event, element, i){

    if (event === 'title') {
      title.play()
    }

    if (event === 'content') {
      content.play()
    }
  })
}

function homeScroll() {

  let desc;
  const line = document.querySelector('.description .line span')
  const line2 = document.querySelector('.description .line2 span')
  const project = gsap.timeline({paused: true})

  gsap.set('[data-scroll-call=project]', {autoAlpha:0})

  function makeid(length) {
     var result           = '';
     var characters       = '…………………………………… ………………………………………………………………………………………………………:. ;.';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

  line.innerHTML = makeid(250)
  line2.innerHTML = makeid(250)


  function lettersHover(){
    desc = new SplitText(".description-text", {type:"chars, words"})
    let letters = desc.chars

    for (const letter of letters) {
      const tl = gsap.timeline()
      letter.addEventListener('mouseenter', () => {
        let rand = letters[Math.floor(Math.random() * letters.length)];
        tl
        .set(rand, {opacity:0})
        .to(rand, {opacity:1, duration:0.01, ease:'power1.out'}, '+=1.2')
      })
    }
  }
  lettersHover()

  function projectHover() {
    const projects = document.querySelectorAll('.project-1, .project-2, .project-3, .project-4') 

    projects.forEach(function(element, index) {
      const textHover = gsap.timeline({paused: true})
      const content = element.querySelector('.project-text')
      console.log(content)
      const text = new SplitText(content, {type:'chars'})
      const chars = text.chars

      for (const char of chars) {
        const speed = 2
        const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
        const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1.4) * speed, 2)
        const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())

        textHover.from(char, { opacity:0, duration }, time);

      if (Math.random() > .9) {
          textHover.fromTo(char, { opacity:0, duration }, { opacity:1, duration }, time + duration);
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

  scroll.on('call', function(event, element, i){

    if (event === 'project') {
      projectAppear(i)
    }
  })

  function projectAppear (i) {
    gsap.to(i.el, {autoAlpha:1, duration:1.5, ease:'power3.out'})
  }
}

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
          mainText.fromTo(char, { opacity:0, duration }, { opacity:1, duration }, time + duration);
      }
  }

  const tl = gsap.timeline()
  const introText = document.querySelectorAll('.logo, .about, .dark')

  if (isMobile.any()) {
    tl
    .set('.cross', {opacity:0})
    .from('.main-project-img img', {duration: 4, ease:'power3.out', scale:1.15})
    .from('.main-project-img img', {duration: 4, ease:'power1.out', autoAlpha:0}, "-=4")
    .from('.main-project-img', {duration:2.3, ease:'expo.inOut', width:'102vw', height:'100vh', top:'-10px', left:'0'}, 2)
    .add(function(){scroll.start()}, "-=1")
    .fromTo(introText, {opacity:0}, {y:'0px',opacity:1, duration:0.2, ease:'power3.out', stagger:0.2}, "-=1.4")
    .fromTo('header .line', {scaleX:0}, {scaleX:1, duration:1.2, ease:'power4.out'}, "-=0.8")
    .add(mainText.play(), "-=2")
    .fromTo('.cross', {rotation:-25, opacity:0}, {rotation:0, opacity:1, duration:2, ease:'power3.out'}, "-=1.6")
  } else {
    tl
    .set('.cross', {opacity:0})
    .from('.main-project-img img', {duration: 4, ease:'power3.out', scale:1.15})
    .from('.main-project-img img', {duration: 4, ease:'power1.out', autoAlpha:0}, "-=4")
    .from('.main-project-img', {duration:2.6, ease:'expo.inOut', width:'102vw', height:'70vw', top:'-10px', left:'0'}, 2)
    .add(function(){scroll.start()}, "-=1")
    .fromTo(introText, {opacity:0}, {y:'0px',opacity:1, duration:0.2, ease:'power3.out', stagger:0.2}, "-=1.4")
    .fromTo('header .line', {scaleX:0}, {scaleX:1, duration:1.2, ease:'power4.out'}, "-=0.8")
    .add(mainText.play(), "-=2")
    .fromTo('.cross', {rotation:-25, opacity:0}, {rotation:0, opacity:1, duration:2, ease:'power3.out'}, "-=1.6")
  }
}

function projectLaunch() {
  const title = new SplitText(".project-title", {type:"words"}), words = title.words;
  const type = new SplitText(".type", {type:"lines"})
  const tl = gsap.timeline()
  const appear = gsap.timeline({paused: true})

  tl
  .fromTo(words, {y:'100%', autoAlpha:0}, {y:'0%',autoAlpha:1, duration:1.6, ease:'power3.out', stagger:0.15}, "+=0.8")
  .to('.line', {scaleX:1, duration:1.8, ease:'expo.inOut'}, '-=1.2')
  .fromTo('.date, .type, .number, .infos-title, .infos-content, .previous', {y:30, opacity:0}, {y:0, opacity:1, duration:1, ease:'power3.out', stagger:0.1}, '-=1')
  .fromTo('.image-cover img', {scale:1.4, autoAlpha:0}, {scale:1.2, autoAlpha:1, duration:1.5, ease:'power3.inOut'}, '-=1.3')
}

function projectScroll() {

  gsap.set('[data-scroll-call="appear"], [data-scroll-call="video"]', {scale:1.2, opacity:0})

  scroll.on('call', function(event, element, i){

    if (event === 'appear') {
      console.log(i)
      gsap.to(i.el, {scale:1, opacity:1, duration:1.5, ease:'power3.out'})
    }

    if (event === 'video') {
      i.el.play()
      gsap.to(i.el, {scale:1, opacity:1, duration:1.5, ease:'power3.out'})
    }
  })


  const previous = document.querySelector('.p-container .previous')
  previous.addEventListener('click', () => {
    console.log(barba.history.previous)
    if ('null' != barba.history.previous) {
      barba.go(barba.history.previous.url)
    }  
  })
}

function homeEnter(){
  const mySplitText = new SplitText(".main-project-text", {type:"chars, words"}),chars = mySplitText.chars;
  const mainText = gsap.timeline({paused: true})

  const tl = gsap.timeline()

  for (const char of chars) {
      const speed = 2
      const random = gsap.utils.interpolate(0.1, 0.8, Math.random())
      const time = Math.min((((1 / random) * 0.1 + random * 0.3) / 1.4) * speed, 2)
      const duration = gsap.utils.interpolate(0.1, 0.35, Math.random())

      mainText.from(char, { opacity:0, duration }, time);

      if (Math.random() > .75) {
          mainText.fromTo(char, { opacity:0, duration }, { opacity:1, duration }, time + duration);
      }
  }

  tl
  .fromTo('.main-project-img img', {scale:1.3, autoAlpha:0}, {scale:1,autoAlpha:1, rotation:0, ease:'power3.out', duration:2})
  .add(mainText.play(), "-=1.8")
  .fromTo('.cross', {rotation:-25, opacity:0}, {rotation:0, opacity:1, duration:2, ease:'power3.out'}, "-=1.3")
}


barba.use(barbaPrefetch)

barba.init({
  debug: true,
  transitions: [{
    name: 'main',
    once({ next }) {
      smooth(next.container)
    },
    beforeEnter({ next }) {
      smooth(next.container)
      scroll.destroy()
    },
    leave(data) {
      return gsap.to(data.current.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    },
    enter(data) {
      data.current.container.style.display = 'none';
      scroll.update()
      return gsap.from(data.next.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    }
  }, {
    name: 'projects',
    from: {
      custom: ({ trigger }) => {
        return trigger.classList && trigger.classList.contains('a-hide');
      },
      namespace:['project']
    },
    beforeEnter({ next }) {
      const tl = gsap.timeline()
      tl
      .to('.transition-plane', {scaleY:1, duration:1.5, ease:'expo.inOut'}, "+=0.3")
      .to('.transition-flex', {y:'-10%', rotation:0, duration:1.5, ease:'power3.inOut'}, '-=1.5')
      .to('.transition', {clip:'rect(0vh 100vw 0vh 0vh)', duration:1.5, ease:'power3.inOut'}, '-=1.5')
      .set('.transition-plane', {scaleY:0})
      scroll.destroy()
      smooth(next.container)
    },
    beforeLeave(data) {
      const projectNumber = document.querySelector('.transition-flex span')
      let nb = data.trigger.getAttribute('project-index')
      projectNumber.innerHTML = nb
      console.log(projectNumber)
      const tl = gsap.timeline()
      const text = new SplitText(projectNumber, {type:"chars"}), letters = text.chars;
      gsap.set('.transition', {clip:'rect(100vh 100vw 100vh 0vh)'})
      gsap.set('.transition-flex', {rotation:-6, scale:1.2, autoAlpha:0.8, y:'0%'})
      gsap.set(letters[1], {y:'15%', autoAlpha:0})
      tl
      .to('.transition', {clip:'rect(0vh 100vw 100vh 0vh)', duration:1.5, ease:'expo.inOut'})
      .to('.transition-flex', {rotation:0, scale:1, autoAlpha:1, duration:2, ease:'power3.inOut'}, '-=1.5')
      .to(letters[1], {y:'0%', duration:1.5, autoAlpha:1, ease:'power4.inOut'}, '-=1.5')
    },
    leave(data) {
      return gsap.to(data.current.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    },
    enter(data) {
      data.current.container.style.display = 'none';
      scroll.update()
      return gsap.from(data.next.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    }
  }, {
    name: 'home-to-about',
    from: {namespace:['home', 'project']},
    to: {namespace:['about']},
    beforeEnter({ next }) {
      const tl = gsap.timeline()
      tl
      .to('.transition-plane', {scaleY:1, duration:1.5, ease:'expo.inOut'}, "+=0.3")
      .to('.transition-flex', {y:'-10%', rotation:0, duration:1.5, ease:'power3.inOut'}, '-=1.5')
      .to('.transition', {clip:'rect(0vh 100vw 0vh 0vh)', duration:1.5, ease:'power3.inOut'}, '-=1.5')
      .set('.transition-plane', {scaleY:0})
      scroll.destroy()
      smooth(next.container)
    },
    beforeLeave(data) {
      const projectNumber = document.querySelector('.transition-flex span')
      projectNumber.innerHTML = 'AB-ME'
      const tl = gsap.timeline()
      const text = new SplitText(projectNumber, {type:"chars"}), letters = text.chars;
      gsap.set('.transition', {clip:'rect(100vh 100vw 100vh 0vh)'})
      gsap.set('.transition-flex', {rotation:-6, scale:1.2, autoAlpha:0.8, y:'0%'})
      gsap.set(letters[1], {y:'15%', autoAlpha:0})
      gsap.set(letters[3], {y:'-15%', autoAlpha:0})
      tl
      .to('.transition', {clip:'rect(0vh 100vw 100vh 0vh)', duration:1.5, ease:'expo.inOut'})
      .to('.transition-flex', {rotation:0, scale:1, autoAlpha:1, duration:2, ease:'power3.inOut'}, '-=1.5')
      .to(letters[1], {y:'0%', duration:1.5, autoAlpha:1, ease:'power4.inOut'}, '-=1.5')
      .to(letters[3], {y:'0%', duration:1.5, autoAlpha:1, ease:'power4.inOut'}, '-=1.4')
    },
    leave(data) {
      return gsap.to(data.current.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    },
    enter(data) {
      data.current.container.style.display = 'none';
      scroll.update()
      return gsap.from(data.next.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    }
  }, {
    name: 'to-home',
    to: {namespace:['home']},
    once({ next }) {
      smooth(next.container)
      const body = document.querySelector('body')
      const preloader = document.querySelector('.preloader')
      const imgLoad = imagesLoaded(body)

      imgLoad.on( 'progress', function( instance, image ) {
        var result = image.isLoaded ? 'loaded' : 'broken';
        preloader.style.display = 'block'
        body.style.cursor = 'wait'
        console.log( 'image is ' + result + ' for ' + image.img.src );
      })

      imgLoad.on( 'done', function( instance ) {
        preloader.style.display = 'none'
        body.style.cursor = 'default'
        console.log( imgLoad.images.length + ' images loaded' );
        homeLaunch()
      })
    },
    beforeEnter({ next }) {
      scroll.destroy()
      smooth(next.container)

      homeEnter()
      
    },
    leave(data) {
      return gsap.to(data.current.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    },
    enter(data) {
      data.current.container.style.display = 'none';
      scroll.update()
      return gsap.from(data.next.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    }
  }, {
    name: 'projects',
    from: {namespace:['home']},
    to: {namespace:['project']},
    once({ next }) {
      smooth(next.container)
    },
    beforeEnter({ next }) {
      const tl = gsap.timeline()
      tl
      .to('.transition-plane', {scaleY:1, duration:1.5, ease:'expo.inOut'}, "+=0.3")
      .to('.transition-flex', {y:'-10%', rotation:0, duration:1.5, ease:'power3.inOut'}, '-=1.5')
      .to('.transition', {clip:'rect(0vh 100vw 0vh 0vh)', duration:1.5, ease:'power3.inOut'}, '-=1.5')
      .set('.transition-plane', {scaleY:0})
      scroll.destroy()
      smooth(next.container)
    },
    beforeLeave(data) {
      const projectNumber = document.querySelector('.transition-flex span')
      let nb = data.trigger.getAttribute('project-index')
      projectNumber.innerHTML = nb
      console.log(projectNumber)
      const tl = gsap.timeline()
      const text = new SplitText(projectNumber, {type:"chars"}), letters = text.chars;
      gsap.set('.transition', {clip:'rect(100vh 100vw 100vh 0vh)'})
      gsap.set('.transition-flex', {rotation:-6, scale:1.2, autoAlpha:0.8, y:'0%'})
      gsap.set(letters[1], {y:'15%', autoAlpha:0})
      tl
      .to('.transition', {clip:'rect(0vh 100vw 100vh 0vh)', duration:1.5, ease:'expo.inOut'})
      .to('.transition-flex', {rotation:0, scale:1, autoAlpha:1, duration:2, ease:'power3.inOut'}, '-=1.5')
      .to(letters[1], {y:'0%', duration:1.5, autoAlpha:1, ease:'power4.inOut'}, '-=1.3')
    },
    leave(data) {
      return gsap.to(data.current.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    },
    enter(data) {
      data.current.container.style.display = 'none';
      scroll.update()
      return gsap.from(data.next.container, {opacity: 0,duration:1,ease:'power3.inOut'})
    }
  }],
  views: [{
    namespace: 'home',
    beforeEnter(){
    },
    afterEnter(){
      homeScroll()
    }
  }, {
    namespace: 'about',
    beforeEnter(){
      aboutLaunch()
      
    },
    afterEnter(){
      aboutScroll()
    }
  }, {
    namespace: 'project',
    beforeEnter(){
      projectLaunch()
    },
    afterEnter(data){
      projectScroll()
    }
  }]
})

function smooth(container) {
  scroll = new LocomotiveScroll({
    el: container.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false
  });
}

// function initScroll(){
//    return new LocomotiveScroll({
//       el: document.querySelector('[data-scroll-container]'),
//       smooth: true
//    });
// }
// let smoothScroll = initScroll();

// barba.hooks.beforeEnter(() => {
//   smoothScroll = initScroll();
// })

// barba.hooks.beforeLeave((data) => {
//   smoothScroll.destroy()
//   body.cursor.style = 'wait';
// })

// const scroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true,
//     lerp: 0.1,
//     firefoxMultiplier: 50,
//     touchMultiplier: 2,
// })

// {
//     name: 'custom-transition',
//     from: {namespace:['home']},
//     to: {namespace:['project']},
//     beforeEnter({ next }) {
//       scroll.destroy()
//       smooth(next.container)
//     },
//     beforeLeave(data) {
//       let projectImg = data.go.childNodes[1]
//       const tl = gsap.timeline()
//       console.log(projectImg)
//       scroll.stop()
//       const done = this.async();
//       if (isMobile.any()) {
//         gsap.to(window, {duration: 2, scrollTo: 0, ease:'power3.out'});
//       }
//       projectImg.style.zIndex = 120;
//       tl
//       .to('.transition', {scaleY:1, duration:1.3, ease:'power4.out', onComplete:done})
//       .set('.transition', {transformOrigin:'top'})
//     },
//     enter(data) {
//       const done = this.async();
//       data.current.container.style.display = 'none';
//       scroll.update()
//       const tl = gsap.timeline()
//       tl.to('.transition', {scaleY:0, duration:1.3, ease:'power4.out', onComplete:done})
//     }