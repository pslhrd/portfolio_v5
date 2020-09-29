import { homeScroll } from '../pages/home'
import { projectLaunch, projectScroll } from '../pages/project'
import { aboutLaunch } from '../pages/about'
import state from '../state'
import SplitText from '../SplitText'

export default [{
  namespace: 'home',
  beforeEnter () {
  },
  afterEnter ({ next }) {
    state.scrollUp = next.container.querySelector('.scrollUp')
    state.scrollUp.addEventListener('click', function () {
      state.scroll.scrollTo('top')
    })
    homeScroll()
  }
}, {
  namespace: 'about',
  beforeEnter () {
    aboutLaunch()
  },
  afterEnter ({ next }) {
    // aboutScroll()
    state.scrollUp = next.container.querySelector('.scrollUp')
    state.scrollUp.addEventListener('click', function () {
      state.scroll.scrollTo('top')
    })
  }
}, {
  namespace: 'project',
  beforeEnter () {
    projectLaunch()
  },
  afterEnter ({ next }) {
    state.scrollUp = next.container.querySelector('.scrollUp')
    state.scrollUp.addEventListener('click', function () {
      state.scroll.scrollTo('top')
    })

    state.nextProject = next.container.querySelector('.next-project')
    state.projectNumber = new SplitText(state.nextProject, { type: 'chars, words' })
    const node = document.createElement('span')
    const data = state.nextProject.getAttribute('data-project')
    const textnode = document.createTextNode(data)
    node.appendChild(textnode)
    node.classList.add('number')
    state.projectNumber.words[0].appendChild(node)

    state.projectImgs = next.container.querySelectorAll('[data-scroll-call="appear"]')
    state.projectTexts = next.container.querySelectorAll('[data-scroll-call="text"]')

    projectScroll()
  }
}]
