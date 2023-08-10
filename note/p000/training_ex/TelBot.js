require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.telegram

let photo = []
const bot = new TelegramBot(token, { polling: true })

/*
'보여줘 (저장한 caption 이름)'을 입력하면
caption 값으로 저장된 모든 사진 호출
*/
bot.onText(/^보여줘/, (msg, match) => {
  let savename = msg.text.substring(4)
  console.log(savename)
  photo.forEach((v) => {
    if (v.savename == savename) {
      bot.sendPhoto(v.chatId, v.chatPhoto)
    }
  })
})

// 저장된 사진 삭제
bot.onText(/^사진지워/, (msg, match) => {
  const chatId = msg.chat.id
  photo = []
  bot.sendMessage(chatId, '사진을 모두 지웠습니다.')
})

/*
사진을 보내면 저장되고 메세지를 보내면 '메세지를 받았습니다'로 반환
*/
bot.on('message', (msg) => {
  const chatId = msg.chat.id
  let chatMsg = ''
  if (msg.photo && msg.caption) {
    const chatPhoto = msg.photo[0].file_id
    const savename = msg.caption
    photo.push({ chatId, chatPhoto, savename })
    console.log(photo)
    bot.sendMessage(chatId, '저장했습니다!')
    // chatMsg = '저장했습니다!'
  } else {
    chatMsg = '메세지를 받았습니다.'
    console.log(chatMsg)
    bot.sendMessage(chatId, chatMsg)
  }
})