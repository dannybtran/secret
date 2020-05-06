import m from 'mithril'
import x from 'aes256'

export default () => {
  let password = m('input#password', {
    type: 'text'
  })
  let payload = m('textarea#payload')
  let output = m('textarea#output')

  const encrypt = () => {
    debugger;
    output.dom.value = x.encrypt(password.dom.value, payload.dom.value)
  }

  const decrypt = () => {
    output.dom.value = x.decrypt(password.dom.value, payload.dom.value)
  }
  return {
    view: () => ([
      m('div.container.center', null,
        m('div.field',
          m('label', null, 'Password'), password,
        ),
        m('div.field',
          m('label', null, 'Payload'), payload,
        ),
        m('div.field',
          m('a.button.greenBg.whiteText', {
            onclick: encrypt
          }, 'Encrypt'),
          m('a.button.redBg.whiteText', {
            onclick: decrypt
          }, 'Decrypt'),
        ),
        m('div.field',
          m('label', null, 'Output'), output,
        ),
      ),
    ]),
  }
}
