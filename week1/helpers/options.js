'use strict';

const yargs = require('yargs');
const { getData } = require('./files');

const options = yargs
  .usage('Usage: text manipulator')
  .option('n', {
    describe: 'No output to console unless p flag is in command',
    type: 'boolean',
  })
  .option('i', {
    describe: 'output to file and create copy of original',
    type: 'string',
  })
  .option('e', {
    describe: 'multiple commands followed by e',
    type: 'string',
  })
  .option('f', {
    describe: 'read commands from file',
    type: 'string',
  }).argv;

async function prepareOptions(rawOptions) {
  const request = {
    command: rawOptions._[0],
    inputFile: rawOptions._[1],
    ...rawOptions,
  };

  if (rawOptions._.length < 2) {
    request.inputFile = request.command;
  }

  if (!('e' in options)) {
    request.e = [request.command];
  }

  if ('f' in options) {
    if (request.e[0] === request.inputFile) {
      request.e = [];
    }

    const fCommands = await getData(options.f);
    request.e = [...request.e, ...fCommands];
  }

  return request;
}

function validateCommands(request) {
  const validationRegex = /^s\/.+\/.+\/[pg]*$/;

  const areCommandsValid = request.e.every((command) =>
    validationRegex.test(command)
  );

  return areCommandsValid;
}

function pNotInCommands(request) {
  const pInCommandRegex = /^s\/.+\/.+\/g?[p]+g?$/;

  const isPNotInCommands = request.e.every(
    (command) => !pInCommandRegex.test(command)
  );

  return isPNotInCommands;
}

async function validateAndPrepareCommands(rawOptions) {
  const preparedRequest = await prepareOptions(rawOptions);

  preparedRequest.isValid = validateCommands(preparedRequest);

  preparedRequest.commandsNoP = pNotInCommands(preparedRequest);

  return preparedRequest;
}

module.exports = { validateAndPrepareCommands, options };
