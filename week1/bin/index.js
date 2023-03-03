#!/usr/bin/env node

'use strict';

const { options, validateAndPrepareCommands } = require('../helpers/options');
const { substituteSelector } = require('../helpers/substituteSelector');

const validatedRequest = validateAndPrepareCommands(options);

validatedRequest.then((request) => {
  if (request.isValid) {
    substituteSelector(request);
  } else console.log('Invalid command syntax');
});
