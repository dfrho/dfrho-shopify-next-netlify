const fetch = require('isomorphic-fetch');

exports.handler = async (event) => {
  const { workoutType, product } = JSON.parse(event.body);

  const query = `LifeFitness is a leading manufacturer of commercial fitness equipment that can be used at home for Performance, HIIT, Strength, Cardio, and Endurance workouts. For the ${product} product, show me a ${workoutType} workout.`;

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
      Authorization:
        'Bearer ' + process.env.NEXT_PUBLIC_REACT_APP_OPEN_AI_API_KEY,
    },
    body: JSON.stringify(params_),
  };

  const response = await fetch(
    'https://api.openai.com/v1/completions',
    requestOptions
  );

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ result: data.choices[0].text || {} }),
  };
};
