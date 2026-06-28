#!/usr/bin/env node
import { Command } from 'commander';
import { remember, recall } from '@memorymesh/sdk';

const program = new Command();
program.name('memorymesh').description('Shared memory for AI coding agents').version('0.1.0');

program.command('init').description('Initialize MemoryMesh').action(() => {
  console.log('MemoryMesh initialized');
});

program.command('remember').argument('<text>').option('-c, --category <category>', 'memory category').action(async (text, opts) => {
  const memory = await remember(text, { category: opts.category });
  console.log(`Saved memory: ${memory.id}`);
});

program.command('recall').argument('<query>').action(async (query) => {
  const results = await recall(query);
  console.log(JSON.stringify(results, null, 2));
});

program.command('doctor').description('Check MemoryMesh setup').action(() => {
  console.log('MemoryMesh doctor: ok');
});

program.parse();
