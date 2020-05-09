import m from 'mithril'
import home from './pages/home'
import decrypt from './pages/decrypt'

const route = () => {
  m.route(document.getElementById('app'), '/', {
    '/encrypt/:password': home,
    '/decrypt/:encrypted': decrypt,
    '/': home,
  })
}

route()
