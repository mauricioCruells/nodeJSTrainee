const fs = require('fs/promises');
import { FileNotFoundError } from './FileNotFoundError';
import { UnwrittableError } from './UnwrittableError';

export class DataIO {
  encoding: string; 

  filepath: string;

  constructor(filepath: string, encoding: string) {
    this.filepath = filepath;
    this.encoding = encoding;
  }

  public async readData(): Promise<string> {
    try {
      const data: string = await fs.readFile(this.filepath, this.encoding);
      return data;
    } catch (error) {
      throw new FileNotFoundError('Please provide a valid file path');
    }
  }

  public async writeData(data: string): Promise<void> {
    try {
      await fs.writeFile(`${this.filepath}.copy`, data);
    } catch (error) {
      throw new UnwrittableError('Something went wrong when writting to file, please check permissions');
    }
  } 
}