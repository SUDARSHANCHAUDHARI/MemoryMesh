import { mkdtemp } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { initMemoryMesh, recall, remember } from './index.js';

describe('MemoryMesh SDK', () => {
  it('initializes the configured store', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-sdk-'));
    const storePath = join(dir, 'memories.json');

    await initMemoryMesh({ storePath });

    const results = await recall('anything', { storePath, projectPath: '/repo-a' });
    expect(results).toEqual([]);
  });

  it('remembers and recalls project-scoped memories from disk', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-sdk-'));
    const storePath = join(dir, 'memories.json');

    await remember('This repo uses local JSON storage', {
      projectPath: '/repo-a',
      storePath,
      tags: ['storage']
    });

    await remember('Another repo uses sqlite later', {
      projectPath: '/repo-b',
      storePath
    });

    const results = await recall('json', {
      projectPath: '/repo-a',
      storePath
    });

    expect(results).toHaveLength(1);
    expect(results[0].content).toBe('This repo uses local JSON storage');
  });
});
