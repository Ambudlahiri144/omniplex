import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = "edge";

export async function POST(req: Request) {
  const {
    messages,
    model,
    temperature,
    max_tokens,
    top_p,
    frequency_penalty,
    presence_penalty,
  } = await req.json();

  const result = await streamText({
    model: openai(model),
    messages: messages,
    temperature: temperature,
    maxTokens: max_tokens,
    topP: top_p,
    frequencyPenalty: frequency_penalty,
    presencePenalty: presence_penalty,
  });

  return result.toDataStreamResponse();
}
