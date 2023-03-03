#!/usr/bin/env node

'use strict';
import { DataIO } from './DataIO';
import { Context } from './Context';
import { EncodeStrategy } from './EncodeStrategy';
import { DecodeStrategy } from './DecodeStrategy'; 
const { options } = require('./options');

const context = new Context(new DecodeStrategy());
const shouldEncode = 'e' in options;

if (shouldEncode) {
  context.setStrategy(new EncodeStrategy());
}

const dataHandler = new DataIO(options._[0], 'utf-8');
const data = dataHandler.readData();

data
  .then((text)=> {
    const result = context.applyStrategyToText(text);
    console.log(result);
    dataHandler.writeData(result);
  })
  .catch(error => console.log(error.message));