import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import os from 'os';
import { Config } from './types.js';

const CONFIG_PATH = path.join(os.homedir(), '.gatorconfig.json');
export const readConfig = () => {
  try {
    const data = readFileSync(CONFIG_PATH, { encoding: 'utf-8' });

    const value = JSON.parse(data) as Config;

    // console.log('Disk JSON Fetched', value);

    return value;
  } catch (err) {
    console.error('Error reading input:', err);
  }
};

export const setUser = (cfg: Config) => {
  const readData = readConfig();

  const data = {
    ...readData,
    db_url: cfg.db_url,
    current_user_name: cfg.current_user_name,
  };

  try {
    writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2), 'utf-8');
    // console.log('Data successfully saved to disk');
  } catch (error) {
    console.log('An error has occurred ', error);
  }
};
