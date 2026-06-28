import { createMemory } from '@memorymesh/core/memory';
import { InMemoryStore } from '@memorymesh/storage';
import type { MemoryCategory } from '@memorymesh/shared/types';

const store = new InMemoryStore();

export async function remember(content: string, options?: { category?: MemoryCategory; tags?: string[]; projectPath?: string }) {
  await store.init();
  return store.save(createMemory({
    content,
    category: options?.category ?? 'project_fact',
    tags: options?.tags,
    projectPath: options?.projectPath ?? process.cwd(),
  }));
}

export async function recall(query: string, projectPath = process.cwd()) {
  return store.search(query, projectPath);
}
