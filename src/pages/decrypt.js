import m from 'mithril'
import x from 'aes256'

export default () => {
  let encrypted

  let password = m('input#password', {
    type: 'text',
    onkeypress: (e) => e.key == 'Enter' ? decrypt() : null,
  })
  let payload = m('textarea#payload')
  let output = m('textarea#output')

  const decrypt = () => {
    output.dom.value = x.decrypt(password.dom.value, encrypted)
    output.dom.parentNode.classList.remove('hidden')
    output.dom.focus()
  }

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
        m('div.field',
          m('a.button.blueBg.whiteText', {
            onclick: decrypt,
          }, 'Show Message'),
        ),
        m('div.field.hidden',
          m('label', null, 'Message'), output,
        ),
        m('a.button.greenBg.whiteText', {href: '/'}, 'Encrypt another Message'),
      ),
    ]),
  }
}
