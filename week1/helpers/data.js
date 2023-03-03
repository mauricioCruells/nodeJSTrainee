'use strict';

function flagSanitizer(flag) {
  const flagObject = {
    options: flag,
    hadP: false,
  };

  if (flag.includes('p')) {
    flagObject.options = flag.replace(/p/, '');
    flagObject.hadP = true;
  }

  return flagObject;
}

function commandParser(command) {
  const { 1: pattern, 2: replacement, 3: flag } = command.split('/');

  const sanitizedFlag = flagSanitizer(flag);

  const commandObject = {
    pattern,
    replacement,
    flag: sanitizedFlag,
  };

  return commandObject;
}

function filterData(arrayData, filter) {
  const filteringRegex = new RegExp(filter);

  const result = arrayData.filter((line) => filteringRegex.test(line));

  return result;
}

function outputDataParser(arrayData) {
  const result = arrayData.reduce(
    (resultString, currentLine) => `${resultString}\n${currentLine}`
  );
  return result;
}

function filterDuplicates(lineData) {
  const arrayData = lineData.split('\n');

  const filteredData = arrayData.filter(
    (line, index) => line === arrayData[index + 1]
  );

  return outputDataParser(filteredData);
}

module.exports = {
  flagSanitizer,
  commandParser,
  filterData,
  outputDataParser,
  filterDuplicates,
};
