const fs = require('fs')
const express = require('express')
const path = require('path')
const cors = require('cors') // cors 미들웨어를 require 합니다.
const app = express()
const PORT = 3000

const _path = path.join(__dirname, './')

console.log(_path)
app.use('/', express.static(_path))
// app.use(cors())

function getAllFilesInFolder(folderPath) {
  const results = []

  function traverseFolder(currentPath) {
    const files = fs.readdirSync(currentPath)

    files.forEach((file) => {
      const fullPath = path.join(currentPath, file)

      if (fs.statSync(fullPath).isDirectory()) {
        traverseFolder(fullPath) // 하위 폴더가 있다면 재귀 호출
      } else {
        results.push(fullPath) // 파일 경로를 결과 배열에 추가
      }
    })
  }

  traverseFolder(folderPath)
  const result_arr = results.map((v) => {
    return '.' + v.substring(53)
  })
  return result_arr
}

// 특정 폴더 경로 설정
const targetFolder = _path + './food new'

// 폴더 내의 모든 폴더와 파일의 경로 가져오기
const allFiles = getAllFilesInFolder(targetFolder)

app.get('/api/data', (req, res) => {
  console.log(allFiles)
  res.json(allFiles)
})

let train = [],
  test = [],
  prediction = []

app.listen(PORT, () => {
  console.log(`너의 서버는? ${PORT}`)
})
