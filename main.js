import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

(async function () {
  // add your prompt here
  const prompt = `
    # Review:
    First thing I would do is calculate how many LEDs are in your 65 feet length and multiple that number by .06 to establish the maximum current required for your power source.
    Next do you want to program the lights yourself or do you want pre written selectable patterns?
    Programmable is hardest method and I have no experience with any of them.
    Selectable patterns are usually written with a couple of hundred patterns to choose from.
    I've had great success withhttps://smile.amazon.com/dp/B07FDW1VZB/ref=cm_sw_r_cp_apa_glt_fabc_WJZCRHYWHS60F9Q7377T
    Your power supply can be from five (5) volts to twenty four (24) volts and there will not be a need to buy a separate power supply for your lights and controller.
    Best of luck on your project.

    Questions:
    1. What is the summary of the review?
    2. What is the subject of this Paragraph?
    3. Is this review positive?
    
    Answers:`;

  // payload parameters: https://huggingface.co/docs/api-inference/detailed_parameters
  const payload = {
    inputs: prompt,
    parameters: {
      temperature: 1,
      min_length: 25,
      max_new_tokens: 100,
      return_full_text: true,
      do_sample: false,
      seed: 10,
      early_stopping: false,
      length_penalty: 0.0,
    },
    options: {
      use_cache: false,
      wait_for_model: false,
    },
  };

  console.log('Evaluating your request - this may take some time - be patient');
  let result = await askBloom(payload);

  console.log('**Prompt**:     "*' + prompt.trim() + '*"');
  try {
    console.log('\n**Completion**: "*' + result[0].generated_text + '*"');
  } catch (e) {
    console.log('Error: ' + e + '\n' + JSON.stringify(result, null, '  '));
  }
})();

async function askBloom(jsonPayload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify(jsonPayload),
  };
  const response = await fetch(
    'https://api-inference.huggingface.co/models/bigscience/bloom',
    options
  );
  return await response.json();
}
