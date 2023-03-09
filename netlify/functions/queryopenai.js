const fetch = require('isomorphic-fetch');

exports.handler = async (event) => {
  const { query } = JSON.parse(event.body);

  const DEFAULT_PARAMS = {
    model: 'text-davinci-002',
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const params_ = { ...DEFAULT_PARAMS, prompt: query };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.REACT_APP_OPEN_AI_API_KEY,
    },
    body: JSON.stringify(params_),
  };
  console.log(
    '🚀 ~ file: queryopenai.js:26 ~ exports.handler= ~ requestOptions:',
    requestOptions
  );

  const response = await fetch(
    'https://api.openai.com/v1/completions',
    requestOptions
  );

  const data = await response.json();
  console.log('🚀 file: queryopenai.js:41 ~ exports.handler= ~ data:', data);

  return {
    statusCode: 200,
    body: JSON.stringify({ result: data.choices[0].text || {} }),
  };
};
