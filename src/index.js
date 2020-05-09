import m from 'mithril'
import home from './pages/home'
import decrypt from './pages/decrypt'

const route = () => {
  m.route(document.getElementById('app'), '/', {
    '/': home,
    '/decrypt/:encrypted': decrypt,
  })
}

route()
