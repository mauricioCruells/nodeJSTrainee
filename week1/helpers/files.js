'use strict';

const fs = require('fs/promises');

const readOptions = { encoding: 'utf8' };

async function getData(filePath) {
  try {
    const data = await fs.readFile(`${filePath}`, readOptions);
    const arrayData = data.split('\n');
    return arrayData;
  } catch (error) {
    console.log(error);
  }
}

async function writeData(filePath, extension, data) {
  try {
    await fs.writeFile(`${filePath}${extension}`, data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getData,
  writeData,
};
