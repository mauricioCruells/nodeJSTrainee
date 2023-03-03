'use strict';

const { substituteSeveral } = require('./substituteAlgos');
const { getData, writeData } = require('./files');
const { outputDataParser, filterDuplicates } = require('./data');

async function substituteSelector(request) {
  const data = await getData(request.inputFile);

  let substitutedData = substituteSeveral(request, data);

  if (!('n' in request || 'i' in request)) {
    console.log(substitutedData);
  }

  if ('n' in request && !request.commandsNoP) {
    substitutedData = filterDuplicates(substitutedData);
    console.log(substitutedData);
  }

  if ('i' in request) {
    await writeData(request.inputFile, '', substitutedData);
    await writeData(request.inputFile, request.i, outputDataParser(data));
  }
}

module.exports = { substituteSelector };
