// server.js
const express = require('express')
const cors = require('cors') // cors 미들웨어를 require 합니다.

const app = express()
const PORT = 3000

// 임의의 배열 생성 (예시용)
const data = [1, 2, 3, 4, 5]

// CORS 정책 설정
app.use(cors())

// 배열 데이터를 JSON 형식으로 응답
app.get('/api/data', (req, res) => {
  res.json(data)
})

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`)
})
