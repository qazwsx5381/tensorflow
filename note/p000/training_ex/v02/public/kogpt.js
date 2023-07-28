import axios from 'axios'
// axios.defaults.withCredentials = true

export async function kogptApi(prompt, max_tokens = 32, temperature, top, n) {
  const REST_API_KEY = process.env.VUE_APP_KOGPT
  let rst = '생각 중...'
  const url = '/v1/inference/kogpt/generation'
  // const url = 'https://api.kakaobrain.com/v1/inference/kogpt/generation'
  const headers = {
    Authorization: 'KakaoAK ' + REST_API_KEY,
    'Content-Type': 'application/json'
  }
  const options = {
    url,
    method: 'POST',
    data: { prompt, max_tokens, temperature, top, n },
    headers,
    responseType: 'json'
  }
  await axios(options).then((res) => {
    rst = res.data.generations[0].text
    console.log(res)
    console.log(rst)
  })
  return rst
}
