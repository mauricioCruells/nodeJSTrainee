'use strict';

const { commandParser, outputDataParser } = require('./data');

function substituteSimple(inputCommand, inputData) {
  const command = commandParser(inputCommand);

  const replacingRegex = new RegExp(command.pattern, command.flag.options);

  const result = inputData.map((line) => {
    let modifiedLine = line.replace(replacingRegex, command.replacement);

    if (!(modifiedLine === line) && command.flag.hadP) {
      modifiedLine = modifiedLine.concat('\n').concat(modifiedLine);
    }

    return modifiedLine;
  });

  const resultString = outputDataParser(result);
  return resultString;
}

function substituteSeveral(request, inputData) {
  let tempResult = inputData;

  request.e.forEach((command) => {
    tempResult = substituteSimple(command, tempResult);
    tempResult = tempResult.split('\n');
  });

  tempResult = outputDataParser(tempResult);

  return tempResult;
}

module.exports = {
  substituteSimple,
  substituteSeveral,
};
