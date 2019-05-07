const superagent = require('superagent')
const renders = {
  welcome: {
    channel: document.getElementById('welcomeChannel'),
    message: document.getElementById('welcomeMessage')
  },
  hongbo: {
    yesorno: document.getElementById('canHongbo'),
    channels: document.getElementById('canHongboChannel'),
    message: document.getElementById('cantHongboMessage')
  },
  passwd: document.getElementById('ownerPwChange')
}

function start () {
  if (!document.getElementById('guildId').value || !document.getElementById('ownerPw').value) {
    alert('저런! 모든 빈칸을 채워주세요!')
  } else {
    superagent.get('헤헷 내가 이런것도 신경안쓸줄 알았냐')
      .then((res) => {
        if (!res.body[document.getElementById('guildId').value] || res.body[document.getElementById('guildId').value].ownerpw !== document.getElementById('ownerPw').value) {
          alert('저런! 없는 서버 코드이거나 관리자 비밀번호가 틀렸습니다!')
        } else {
          document.getElementById('startup').style.display = 'none'
          document.getElementById('main').style.display = 'block'
          document.getElementsByTagName('body')[0].classList.add('bg-light')
          renders.welcome.channel.value = res.body[document.getElementById('guildId').value].welcome.channel
          renders.welcome.message.value = res.body[document.getElementById('guildId').value].welcome.text
          if (res.body[document.getElementById('guildId').value].hongbo.free) {
            renders.hongbo.yesorno.setAttribute('checked', 'true')
          }
          renders.hongbo.channels.value = res.body[document.getElementById('guildId').value].hongbo.channel
          renders.hongbo.message.value = res.body[document.getElementById('guildId').value].hongbo.text
          renders.passwd.value = res.body[document.getElementById('guildId').value].ownerpw
        }
      })
  }
}

function post () {
  superagent.get('헤헷 내가 이런것도 신경안쓸줄 알았냐')
    .then((res) => {
      res.body[document.getElementById('guildId').value].welcome.channel = renders.welcome.channel.value
      res.body[document.getElementById('guildId').value].welcome.text = renders.welcome.message.value
      res.body[document.getElementById('guildId').value].hongbo.free = renders.hongbo.yesorno.checked
      res.body[document.getElementById('guildId').value].hongbo.channel = renders.hongbo.channels.value
      res.body[document.getElementById('guildId').value].hongbo.text = renders.hongbo.message.value
      res.body[document.getElementById('guildId').value].ownerpw = renders.passwd.value
      superagent.put('헤헷 내가 이런것도 신경안쓸줄 알았냐')
        .send(res.body)
        .then(() => { alert('적용완료!') })
    })
}