/**
 * @name reports-v1-api
 * @description This module packages the Reports API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
var reportscontroller = require('../controllers/reportscontroller');

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

/* api.get('/',
(req, res) => {
  res.sendOk({greeting: 'Welcome to Hydra Express!'});
}); */

api.get('/',(req, res) => {
  res.sendOk({greeting: 'Welcome to Hydra Express!'});
});

api.get('/test', reportscontroller.test);
api.get('/geteventdetails', reportscontroller.geteventdetails);
api.get('/geteventpoc', reportscontroller.geteventpoc);
api.get('/geteventsummaries', reportscontroller.geteventsummaries);
api.get('/getassociatedetails', reportscontroller.getassociatedetails);
api.post('/getparticipationmetrics', reportscontroller.getparticipationmetrics);

module.exports = api;
