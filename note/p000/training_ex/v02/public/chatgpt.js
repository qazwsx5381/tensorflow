// https://api.openai.com/v1/chat/completions

import { Configuration } from 'openai';
import { OpenAIApi } from 'openai';

const getGPT = async (userinput, temperature = 0.5, max_tokens = 256) => {
  const configuration = new Configuration({
    apiKey: process.env.VUE_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo', // or 'text-davinci-003
    // prompt :pmt
    messages: [
      {
        role: 'system',
        content: '돈 퍼주는 부자',
      },
      {
        role: 'user',
        content: userinput,
      },
    ],
    temperature,
    max_tokens,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,

    // stop:['Human:',"AI"]
  });


  const data = response.data;
  console.log(data);
  return data;
};

export default getGPT;
