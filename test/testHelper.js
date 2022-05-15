const chai = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const path = require('path');

const appRoot = path.resolve();

const app = require(`${appRoot}/app`);

const { expect } = chai;
const sandbox = sinon.createSandbox();

module.exports = {
  app,
  expect,
  request,
  sandbox,
};
