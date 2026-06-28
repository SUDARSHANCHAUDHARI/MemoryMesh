import { mkdtemp, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { JsonFileStore } from './index.js';
import type { MemoryRecord } from '@memorymesh/shared/types';

function memory(overrides: Partial<MemoryRecord> = {}): MemoryRecord {
  const now = '2026-06-28T00:00:00.000Z';
  return {
    id: 'memory-1',
    projectPath: '/repo',
    category: 'project_fact',
    content: 'This repo uses pnpm workspaces',
    tags: ['pnpm'],
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

describe('JsonFileStore', () => {
  it('initializes an empty memory file', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-'));
    const filePath = join(dir, 'memories.json');
    const store = new JsonFileStore(filePath);

    await store.init();

    expect(JSON.parse(await readFile(filePath, 'utf8'))).toEqual([]);
  });

  it('persists memories across store instances', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-'));
    const filePath = join(dir, 'memories.json');
    const firstStore = new JsonFileStore(filePath);
    const secondStore = new JsonFileStore(filePath);

    await firstStore.save(memory());

    const results = await secondStore.search('pnpm', '/repo');

    expect(results).toMatchObject([
      {
        id: 'memory-1',
        content: 'This repo uses pnpm workspaces'
      }
    ]);
  });
});
