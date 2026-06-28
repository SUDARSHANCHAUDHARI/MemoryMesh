import type { MemoryCategory, MemoryRecord } from '@memorymesh/shared/types';

export function createMemory(input: {
  projectPath: string;
  category: MemoryCategory;
  content: string;
  tags?: string[];
}): MemoryRecord {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    projectPath: input.projectPath,
    category: input.category,
    content: input.content,
    tags: input.tags ?? [],
    createdAt: now,
    updatedAt: now,
  };
}
