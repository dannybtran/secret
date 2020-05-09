import m from 'mithril'
import x from 'aes256'

export default () => {
  let password = m('input#password', {
    type: 'text',
    onkeypress: (e) => e.key == 'Enter' ? encrypt() : null,
  })
  let payload = m('textarea#payload')
  let output = m('textarea#output')

  const encrypt = () => {
    output.dom.value = window.location.href.split('#!')[0] + '#!/decrypt/' + btoa(x.encrypt(password.dom.value, payload.dom.value))
    output.dom.parentNode.classList.remove('hidden')
    copyLink.dom.classList.remove('hidden')
  }

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
      payload.dom.focus()
    },
    view: () => ([
      m('div.container.center', null,
        m('div.field',
          m('label', null, 'Message'), payload,
        ),
        m('div.field',
          m('label', null, 'Create a Password'), password,
        ),
        m('div.field',
          m('a.button.greenBg.whiteText', {
            onclick: encrypt
          }, 'Encrypt'),
        ),
        m('div.field.hidden',
          m('label', null, 'Link'), output,
        ),
        copyLink,
      ),
    ]),
  }
}
