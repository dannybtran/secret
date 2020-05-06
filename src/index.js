import m from 'mithril'
import home from './pages/home'

const route = () => {
  m.route(document.getElementById('app'), '/', {
    '/': home,
  })
}

route()
