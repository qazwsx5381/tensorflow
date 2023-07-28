<template>
  <div>
    <div>OpenAI 자연어 처리기반 GPT3.5 turbo 챗</div>
    <hr />
    <textarea
      disabled
      name=""
      id=""
      cols="30"
      rows="10"
      :value="resp"
    ></textarea>
    <br />
    <input
      type="text"
      placeholder="질문할 내용을 입력하세요."
      v-model="inData"
      @keyup.enter="gpt"
    />
    <button @click="gpt">전송</button>
  </div>
</template>
<script>
import { openApi } from '../../public/openAI.js'
export default {
  name: 'openAPI 기반 chatGPT',
  data() {
    return {
      inData: '',
      resp: ''
    }
  },
  methods: {
    gpt: async function () {
      const ask = this.inData
      const answer = await openApi(ask)
      this.resp = answer
    }
  }
}
</script>
<style scoped>
textarea {
  font-size: 1.1em;
  color: rgb(159, 177, 3);
  resize: none;
  font-weight: bold;
  background-color: rgb(226, 204, 255);
}
input {
  width: 210px;
  height: 30px;
  margin-right: 5px;
  border: none;
  border-bottom: 1px solid black;
}
input:focus {
  outline-style: none;
}
button {
  width: 45px;
  height: 30px;
}
</style>
