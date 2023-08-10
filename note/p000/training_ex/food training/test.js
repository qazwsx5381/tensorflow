const tf = dfd.tensorflow
let normalizedImg = ''

// 데이터 디렉토리 설정 및 데이터 로드
let dataDir = showData() // 이미지 파일 URL이 담긴 텍스트 파일 경로
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/api/data')
    data = response.json()
    return data
  } catch (error) {
    console.error('데이터를 가져올 수 없습니다.', error)
    return []
  }
}

const imageWidth = 224
const imageHeight = 224
const train = [],
  test = [],
  prediction = [],
  train_tensor = []

async function showData() {
  dataDir = await fetchData()
  dataDir.forEach((v) => {
    if (v.indexOf('train') > 0) train.push(v)
    if (v.indexOf('test') > 0) test.push(v)
    if (v.indexOf('validation') > 0) prediction.push(v)
  })
  console.log(train.length)
  console.log(test.length)
  console.log(prediction.length)
  loadDataFromDirectory(train, imageWidth, imageHeight).then((data) => {
    // console.log(data)
    // 로드한 데이터를 사용하는 코드를 이곳에 작성합니다.
    data.forEachAsync((batch) => {
      //   // 각 배치에 대한 처리
      batch.print()
      // train_tensor.push(batch)
      // console.log(train_tensor)
    })
  })
}

// 이미지 데이터 로드 및 전처리 함수
async function loadDataFromDirectory(data, imageWidth, imageHeight) {
  tf.setBackend('webgl')
  const imgDataGenerator = tf.data.generator(async function* () {
    // 이미지 파일 로드를 위해 Fetch API 사용 (브라우저 환경에서 사용)

    // 파일 URLs를 배열로 변환
    // const urlsArray = data.trim().split(/\r?\n/)
    const urlsArray = data
    console.log(urlsArray)

    for (const url of urlsArray) {
      // 이미지 데이터 로드
      const response = await fetch(url)
      //   console.log(response)
      const blob = await response.blob()
      //   console.log(blob)
      await handleFile(blob)
      //   console.log(handleFile(blob))
      //   const img = await tf.browser.fromPixels(blob)

      //   // 이미지 크기 조정 및 정규화
      //   const resizedImg = tf.image.resizeBilinear(img, [imageWidth, imageHeight])
      //   const normalizedImg = resizedImg.div(255)

      // 이미지를 텐서로 변환하여 반환
      yield normalizedImg

      // 리소스 해제
      //   img.dispose()
      //   resizedImg.dispose()
    }
  })

  // 배치로 데이터 로드
  const batchSize = 32
  return imgDataGenerator.batch(batchSize)
}

async function handleFile(blob) {
  // 이미지 데이터 로드
  const img = new Image()
  img.onload = async function () {
    // 이미지 크기 조정 및 정규화
    const canvas = document.createElement('canvas')
    canvas.width = 224
    canvas.height = 224
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, 224, 224)
    const imgData = ctx.getImageData(0, 0, 224, 224)
    const tensor = tf.browser.fromPixels(imgData).div(255)
    // console.log(tensor)

    // 데이터 증강 수행 (예시로 뒤집기 증강만 수행)
    // const augmentedImg = tf.image.flipLeftRight(tensor)

    // 사용한 리소스 해제
    // imgData.dispose()
    tensor.dispose()
    // augmentedImg.dispose()

    return (normalizedImg = tf.browser.fromPixels(imgData).div(255))
  }

  img.src = URL.createObjectURL(blob)

  // 이미지를 표시하기 위해 컨테이너에 추가
  // const imageContainer = document.getElementById('imageContainer')
  // imageContainer.innerHTML = ''
  // imageContainer.appendChild(img)
}
