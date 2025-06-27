import { openaiV2 } from '@ai-sdk/openai/v2'; // 仮名

const modelV2 = openaiV2('gpt-4.1');
// modelV2.supportedUrls が正しくセットされているはず

await generateText({
  model: modelV2,
  prompt: '…',
  /* そのほか */
});
