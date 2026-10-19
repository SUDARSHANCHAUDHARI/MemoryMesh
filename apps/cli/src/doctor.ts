import { constants } from 'node:fs';
import { access, readFile, stat } from 'node:fs/promises';
import { dirname } from 'node:path';

export interface DoctorCheck {
  name: string;
  ok: boolean;
  detail: string;
}

/** Read-only checks of what the CLI needs: a readable store, a writable store location, a real project dir. */
export async function runDoctor(storePath: string, projectPath: string): Promise<DoctorCheck[]> {
  if (!storePath) {
    return [{ name: 'store path', ok: false, detail: 'empty (check --store or MEMORYMESH_STORE_PATH)' }];
  }
  return [
    await checkStoreFile(storePath),
    await checkStoreWritable(storePath),
    await checkProject(projectPath)
  ];
}

async function checkStoreFile(storePath: string): Promise<DoctorCheck> {
  const name = 'store file';
  let raw: string;
  try {
    raw = await readFile(storePath, 'utf8');
  } catch (error) {
    if (errorCode(error) === 'ENOENT') {
      return { name, ok: true, detail: `${storePath} not created yet (run memorymesh init)` };
    }
    return { name, ok: false, detail: `${storePath} cannot be read: ${errorMessage(error)}` };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return { name, ok: false, detail: `${storePath} is not a JSON array` };
    }
    return { name, ok: true, detail: `${storePath} (${parsed.length} memories)` };
  } catch (error) {
    return { name, ok: false, detail: `${storePath} is not valid JSON: ${errorMessage(error)}` };
  }
}

async function checkStoreWritable(storePath: string): Promise<DoctorCheck> {
  const name = 'store writable';
  // The store or its folders may not exist yet; init creates them under the nearest existing parent.
  let target = storePath;
  for (;;) {
    try {
      const info = await stat(target);
      if (target !== storePath && !info.isDirectory()) {
        return { name, ok: false, detail: `${target} is not a directory` };
      }
      await access(target, constants.W_OK);
      return { name, ok: true, detail: target };
    } catch (error) {
      if (errorCode(error) !== 'ENOENT' || dirname(target) === target) {
        return { name, ok: false, detail: `${target} is not writable: ${errorMessage(error)}` };
      }
      target = dirname(target);
    }
  }
}

async function checkProject(projectPath: string): Promise<DoctorCheck> {
  const name = 'project';
  try {
    const info = await stat(projectPath);
    return info.isDirectory()
      ? { name, ok: true, detail: projectPath }
      : { name, ok: false, detail: `${projectPath} is not a directory` };
  } catch (error) {
    return { name, ok: false, detail: `${projectPath} cannot be read: ${errorMessage(error)}` };
  }
}

function errorCode(error: unknown): unknown {
  return typeof error === 'object' && error !== null && 'code' in error ? error.code : undefined;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
