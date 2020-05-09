import m from 'mithril'
import x from 'aes256'

export default () => {
  const encrypt = () => {
    output.dom.value = window.location.href.split('#!')[0] + '#!/decrypt/' + btoa(x.encrypt(password.dom.value, payload.dom.value))
    output.dom.parentNode.classList.remove('hidden')
    copyLink.dom.classList.remove('hidden')
  }

  let pw

  let password = m('input#password', {
    type: 'text',
    onkeypress: (e) => e.key == 'Enter' ? encrypt() : encryptMessage.dom.parentNode.classList.remove('hidden'),
  })
  let payload = m('textarea#payload', {
    onkeypress: (e) => password.dom.parentNode.classList.remove('hidden'),
  })
  let output = m('textarea#output')

  let encryptMessage = m('a.button.greenBg.whiteText', { onclick: encrypt }, 'Encrypt')

  const copy = () => {
    output.dom.select()
    document.execCommand('copy')
    copyLink.dom.innerText = '✓ Copied'
  }

  let copyLink = m('a.button.blueBg.whiteText.hidden', {
    onclick: copy
  }, 'Copy Link')

  return {
    oncreate: () => {
      pw = m.route.param('password')
      if (pw) {
        password.dom.value = atob(pw)
        password.dom.parentNode.classList.remove('hidden')
        encryptMessage.dom.parentNode.classList.remove('hidden')
      }
      payload.dom.focus()
    },
    view: () => ([
      m('div.container.center', null,
        m('div.field',
          m('label', null, 'Type your message'), payload,
        ),
        m('div.field.hidden',
          m('label', null, 'Create a Password'), password,
        ),
        m('div.field.hidden',
          encryptMessage,
        ),
        m('div.field.hidden',
          m('label', null, 'Share the link'), output,
        ),
        copyLink,
      ),
    ]),
  }
}
