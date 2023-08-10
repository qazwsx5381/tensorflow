<template>
  <div>MobileNet을 이용한 이미지 분석</div>
  <hr />
  <div id="display">
    <input
      ref="image"
      type="file"
      name="img"
      id="input"
      accept="image/*"
      multiple="multiple"
      style="display: none"
      @change="upIMG"
    />
    <label for="input" id="img-box">+</label>
    <div>
      <img ref="img" :src="imgBase64" alt="이미지 준비중.." v-if="imgBase64" />
    </div>
    <hr />
    <div id="text">{{ text }}</div>
    <button v-if="imgBase64" @click="predict">분석</button>
    <div id="result">{{ result }}</div>
  </div>
</template>
<script>
import * as mobilenet from '@tensorflow-models/mobilenet'
export default {
  name: 'App',
  data() {
    return {
      imgBase64: '',
      result: '',
      text: '파일을 업로드하여 이미지분석을 시작하시오.'
    }
  },
  methods: {
    upIMG: function () {
      const image = this.$refs.image.files[0]
      // console.log(image)
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (event) => {
        console.log(event.target.result)
        this.text = event.target.result
        this.imgBase64 = event.target.result
      }
    },
    predict: function () {
      const tf = this.$tf
      const img = this.$refs.img
      mobilenet.load().then((model) => {
        model.classify(img).then((rst) => {
          this.result =
            '분석결과: ' +
            rst[0].className +
            '(' +
            (rst[0].probability * 100).toFixed(2) +
            '%)'
          const timg = tf.browser.fromPixels(img)
          timg.print()
          tf.dispose(timg)
        })
      })
    }
  }
}
</script>
<style scoped>
#img-box {
  display: inline-block;
  width: 100px;
  height: 100%;
  border: 1px solid #8388e1;
  border-radius: 5px;
  color: #fff;
  background-color: lightblue;
  font-size: 3em;
  line-height: 100px;
}
img {
  margin: 10px;
  width: 200px;
  height: 100%;
  border-radius: 5px;
}
</style>
