// https://api.openai.com/v1/chat/completions

import { Configuration } from 'openai';
import { OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.VUE_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const getGPT2 = async (userinput) => {
  const pmt = `${userinput}`;
  const response = await openai.createCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: '10대 여성 말투',
      },
      {
        role: 'system',
        content: '가수에 관하여 말하기',
      },
      {
        role: 'user',
        content: `${pmt}`,
      },
    ],
  });

  const answer = response.data.choices[0].message.content
  return answer
};

export default getGPT2;
