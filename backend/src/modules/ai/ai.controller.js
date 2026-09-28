import { aiService } from './ai.service.js';

export async function streamJobSummary(request, response) {
  const abortController = new AbortController();
  const abortStream = () => {
    if (!response.writableEnded) abortController.abort();
  };

  request.once('aborted', abortStream);
  response.once('close', abortStream);

  try {
    const result = await aiService.createJobSummaryStream(request.params.id, {
      abortSignal: abortController.signal,
    });

    await result.pipeTextStreamToResponse(response);
  } finally {
    request.off('aborted', abortStream);
    response.off('close', abortStream);
  }
}
