import axios from 'axios'
// axios.defaults.withCredentials = true

export async function openApi(text) {
  const apiKey = process.env.VUE_APP_openAI
  const url = 'https://api.openai.com/v1/chat/completions'
  const keywords = text
  let rst = '생각 중'
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    {
      role: 'user',
      content: keywords
    }
  ]
  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  }
  const data = {
    model: 'gpt-3.5-turbo',
    temperature: 0.5,
    n: 1,
    messages: messages
  }
  await axios
    .post(url, data, config)
    .then(function (res) {
      rst = res.data.choices[0].message.content
    })
    .catch(function (error) {
      console.error(error)
    })
  return rst
}
