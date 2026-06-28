import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { MemoryRecord } from '@memorymesh/shared/types';

export interface MemoryStore {
  init(): Promise<void>;
  save(memory: MemoryRecord): Promise<MemoryRecord>;
  list(projectPath?: string): Promise<MemoryRecord[]>;
  search(query: string, projectPath?: string): Promise<MemoryRecord[]>;
}

export class JsonFileStore implements MemoryStore {
  constructor(private readonly filePath: string) {}

  async init(): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });

    try {
      await readFile(this.filePath, 'utf8');
    } catch (error) {
      if (isMissingFile(error)) {
        await writeFile(this.filePath, '[]', 'utf8');
        return;
      }

      throw error;
    }
  }

  async save(memory: MemoryRecord): Promise<MemoryRecord> {
    const memories = await this.readMemories();
    memories.push(memory);
    await this.writeMemories(memories);
    return memory;
  }

  async list(projectPath?: string): Promise<MemoryRecord[]> {
    const memories = await this.readMemories();
    return projectPath ? memories.filter(memory => memory.projectPath === projectPath) : memories;
  }

  async search(query: string, projectPath?: string): Promise<MemoryRecord[]> {
    const q = query.toLowerCase();
    const memories = await this.list(projectPath);

    return memories.filter(memory =>
      memory.content.toLowerCase().includes(q) ||
      memory.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  private async readMemories(): Promise<MemoryRecord[]> {
    await this.init();
    const raw = await readFile(this.filePath, 'utf8');
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      throw new Error(`Invalid MemoryMesh store at ${this.filePath}: expected an array`);
    }

    return parsed as MemoryRecord[];
  }

  private async writeMemories(memories: MemoryRecord[]): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, `${JSON.stringify(memories, null, 2)}\n`, 'utf8');
  }
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

function isMissingFile(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}
