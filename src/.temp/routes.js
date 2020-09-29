const c1 = () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/malowiderspach/Documents/Workspace/Coding/avec-paulo/portfolio_v5/src/pages/About.vue")
const c2 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/malowiderspach/Documents/Workspace/Coding/avec-paulo/portfolio_v5/node_modules/gridsome/app/pages/404.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/malowiderspach/Documents/Workspace/Coding/avec-paulo/portfolio_v5/src/pages/Index.vue")

export default [
  {
    path: "/about/",
    component: c1
  },
  {
    name: "404",
    path: "/404/",
    component: c2
  },
  {
    name: "home",
    path: "/",
    component: c3
  },
  {
    name: "*",
    path: "*",
    component: c2
  }
]
