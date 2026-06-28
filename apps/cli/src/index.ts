#!/usr/bin/env node
import { Command } from 'commander';
import { defaultStorePath, initMemoryMesh, remember, recall } from '@memorymesh/sdk';

const program = new Command();
program
  .name('memorymesh')
  .description('Shared memory for AI coding agents')
  .version('0.1.0')
  .option('--store <path>', 'Path to the MemoryMesh JSON store')
  .option('--project <path>', 'Project path scope', process.cwd());

program.command('init').description('Initialize MemoryMesh').action(async () => {
  const options = program.opts<{ store?: string }>();
  const result = await initMemoryMesh({ storePath: options.store });
  console.log(`MemoryMesh initialized at ${result.storePath}`);
});

program.command('remember').argument('<text>').option('-c, --category <category>', 'memory category').action(async (text, opts) => {
  const options = program.opts<{ store?: string; project: string }>();
  const memory = await remember(text, {
    category: opts.category,
    projectPath: options.project,
    storePath: options.store
  });
  console.log(`Saved memory: ${memory.id}`);
});

program.command('recall').argument('<query>').action(async (query) => {
  const options = program.opts<{ store?: string; project: string }>();
  const results = await recall(query, {
    projectPath: options.project,
    storePath: options.store
  });
  console.log(JSON.stringify(results, null, 2));
});

program.command('doctor').description('Check MemoryMesh setup').action(() => {
  const options = program.opts<{ store?: string; project: string }>();
  console.log(`MemoryMesh doctor: ok`);
  console.log(`Store: ${options.store ?? defaultStorePath()}`);
  console.log(`Project: ${options.project}`);
});

program.parse();
