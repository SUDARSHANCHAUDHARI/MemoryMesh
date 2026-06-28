import type { MemoryRecord } from '@memorymesh/shared/types';

export interface MemoryStore {
  init(): Promise<void>;
  save(memory: MemoryRecord): Promise<MemoryRecord>;
  list(projectPath?: string): Promise<MemoryRecord[]>;
  search(query: string, projectPath?: string): Promise<MemoryRecord[]>;
}

export class InMemoryStore implements MemoryStore {
  private memories: MemoryRecord[] = [];

  async init() {}

  async save(memory: MemoryRecord) {
    this.memories.push(memory);
    return memory;
  }

  async list(projectPath?: string) {
    return projectPath ? this.memories.filter(m => m.projectPath === projectPath) : this.memories;
  }

  async search(query: string, projectPath?: string) {
    const q = query.toLowerCase();
    const items = await this.list(projectPath);
    return items.filter(m => m.content.toLowerCase().includes(q) || m.tags.some(t => t.toLowerCase().includes(q)));
  }
}
