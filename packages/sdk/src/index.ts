import { homedir } from 'node:os';
import { join } from 'node:path';
import { createMemory } from '@memorymesh/core/memory';
import { JsonFileStore } from '@memorymesh/storage';
import type { MemoryCategory } from '@memorymesh/shared/types';

export interface MemoryMeshOptions {
  category?: MemoryCategory;
  tags?: string[];
  projectPath?: string;
  storePath?: string;
}

export interface RecallOptions {
  projectPath?: string;
  storePath?: string;
}

export function defaultStorePath(): string {
  return process.env.MEMORYMESH_STORE_PATH ?? join(homedir(), '.memorymesh', 'memories.json');
}

export async function initMemoryMesh(options?: { storePath?: string }) {
  const store = new JsonFileStore(options?.storePath ?? defaultStorePath());
  await store.init();
  return { storePath: options?.storePath ?? defaultStorePath() };
}

export async function remember(content: string, options?: MemoryMeshOptions) {
  const store = new JsonFileStore(options?.storePath ?? defaultStorePath());
  await store.init();
  return store.save(createMemory({
    content,
    category: options?.category ?? 'project_fact',
    tags: options?.tags,
    projectPath: options?.projectPath ?? process.cwd(),
  }));
}

export async function recall(query: string, options?: RecallOptions) {
  const store = new JsonFileStore(options?.storePath ?? defaultStorePath());
  return store.search(query, options?.projectPath ?? process.cwd());
}
