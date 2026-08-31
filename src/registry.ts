import { CommandsRegistry, CommandHandler } from './types.js';

export function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler ,
) {
  registry[cmdName] = handler;
}

export async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  const handlerToRun = registry[cmdName];

  await handlerToRun(...args);
}
