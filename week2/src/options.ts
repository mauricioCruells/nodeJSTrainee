const yargs = require('yargs');

type CommandOptions = {
  _: string[],
  e?: boolean
};

const options: CommandOptions = yargs
  .usage('Usage: RLE implementation for coding and decoding strings')
  .option('e', {
    describe: 'Decode given text file encoded using RLE with numbers first',
    type: 'boolean',
  }).argv;

module.exports = { options }; 