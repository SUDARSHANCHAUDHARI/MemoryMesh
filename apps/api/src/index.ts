import Fastify from 'fastify';
import { remember, recall } from '@memorymesh/sdk';

const app = Fastify({ logger: true });

app.get('/health', async () => ({ ok: true }));

app.post('/memories', async (request) => {
  const body = request.body as { content: string; category?: any; tags?: string[]; projectPath?: string };
  return remember(body.content, body);
});

app.get('/memories/search', async (request) => {
  const query = request.query as { q: string; projectPath?: string };
  return recall(query.q, query.projectPath);
});

app.listen({ port: 4737, host: '0.0.0.0' });
