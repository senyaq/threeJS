import Home from '../pages'
import About from '../pages/about'
import SignIn from '../pages/sign_In'

const routes = [
  {
    title: 'Home',
    path: '/',
    exact: true,
    component: Home,
  },
  {
    title: 'About',
    path: '/about',
    component: About,
  },
  {
    title: 'SignIn',
    path: '/sign_in',
    component: SignIn,
  },
]

export default routes
