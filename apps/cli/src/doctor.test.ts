import { chmod, mkdtemp, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { runDoctor } from './doctor.js';

const failed = (checks: { ok: boolean; name: string }[]) => checks.filter(c => !c.ok).map(c => c.name);

describe('memorymesh doctor', () => {
  it('passes for a valid store and project', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-doctor-'));
    const storePath = join(dir, 'memories.json');
    await writeFile(storePath, '[]', 'utf8');

    expect(failed(await runDoctor(storePath, dir))).toEqual([]);
  });

  it('passes when the store is not created yet but its parent is writable', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-doctor-'));

    expect(failed(await runDoctor(join(dir, 'nested', 'memories.json'), dir))).toEqual([]);
  });

  it('fails for a store that is not valid JSON', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-doctor-'));
    const storePath = join(dir, 'memories.json');
    await writeFile(storePath, '{not json', 'utf8');

    expect(failed(await runDoctor(storePath, dir))).toEqual(['store file']);
  });

  it('fails for a store that is not an array', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-doctor-'));
    const storePath = join(dir, 'memories.json');
    await writeFile(storePath, '{}', 'utf8');

    expect(failed(await runDoctor(storePath, dir))).toEqual(['store file']);
  });

  it('fails when the store location is not writable', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-doctor-'));
    await chmod(dir, 0o500);
    try {
      expect(failed(await runDoctor(join(dir, 'memories.json'), dir))).toEqual(['store writable']);
    } finally {
      await chmod(dir, 0o700);
    }
  });

  it('fails for a missing project path', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'memorymesh-doctor-'));

    expect(failed(await runDoctor(join(dir, 'memories.json'), join(dir, 'missing')))).toEqual(['project']);
  });

  it('fails for an empty store path', async () => {
    expect(failed(await runDoctor('', process.cwd()))).toEqual(['store path']);
  });
});
