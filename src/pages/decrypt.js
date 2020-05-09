import m from 'mithril'
import x from 'aes256'

export default () => {
  const decrypt = () => {
    output.dom.value = x.decrypt(password.dom.value, encrypted)
    output.dom.parentNode.classList.remove('hidden')
    encryptAnother.dom.classList.remove('hidden')
    output.dom.focus()
  }

  let encrypted

  let password = m('input#password', {
    type: 'text',
    onkeypress: (e) => e.key == 'Enter' ? decrypt() : showMessage.dom.classList.remove('hidden'),
  })
  let payload = m('textarea#payload')
  let output = m('textarea#output')
  let encryptAnother = m('a.button.greenBg.whiteText.hidden', {href: window.location.href.split('#!')[0]}, 'Encrypt another Message')
  let showMessage = m('a.button.blueBg.whiteText.hidden', { onclick: decrypt, }, 'Show Message')

  return {
    oncreate: () => {
      encrypted = m.route.param('encrypted')
      window.password = password
      password.dom.focus()
    },
    view: () => ([
      m('div.container.center', null,
        m('div.field',
          m('label', null, 'Password'), password,
        ),
        m('div.field', showMessage),
        m('div.field.hidden',
          m('label', null, 'Message'), output,
        ),
        encryptAnother,
      ),
    ]),
  }
}
