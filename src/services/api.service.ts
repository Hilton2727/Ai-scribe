export async function sendChatMessage(prompt: string) {
  const response = await fetch('https://ai-scribe-ten.vercel.app/api/chat/chat-api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
} 