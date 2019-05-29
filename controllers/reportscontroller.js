const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
var bodyParser  = require('body-parser');
var EventDetails = require('../models/eventdetails');
var EventPOCDetails = require('../models/eventpoc');
var EventSummary = require('../models/eventsummary');
var AssociateDetails = require('../models/associatedetails');

var reportsapp = express()
reportsapp.use(bodyParser.urlencoded({ extended: false }));
reportsapp.use(bodyParser.json());

/* var _headcount = 0;
var _uniquevolunteers = 0;
var _totalvolunteeringhours = 0;
var _coverage = 0;
var _avgfrequencypervolunteer = 0;
var _avghoursperassociate = 0;
var _avghourspervolunteer = 0;
var _totalnoofevents = 0;
var _avghoursperevent = 0;
var _avgnoofvolunteersattendedperevent = 0;
var _avghoursvolunteeredpervolunteerperevent = 0; */


exports.test = function(req, res) {
    console.log('----->');
    return res.sendOk({greeting: 'From Controller!'})

  }


exports.geteventdetails = function(req, res) {
    console.log('----->Eventdetails');

    EventDetails.find().then(data => {
      res.sendOk({
        message : "Fetched data successfully",
        eventdetails : data
      });
    });
  }

  exports.geteventpoc = function(req, res) {
    console.log('----->Eventdetails');

    EventPOCDetails.find().then(data => {
      res.sendOk({
        message : "Fetched data successfully",
        eventpocdetails : data
      });
    });
  }

  exports.geteventsummaries = function(req, res) {
    console.log('----->Eventdetails');

    EventSummary.find().then(data => {
      res.sendOk({
        message : "Fetched data successfully",
        eventsummary : data
      });
    });
  }

  exports.getassociatedetails = function(req, res) {
    console.log('----->Associatedetails');

    AssociateDetails.find().then(data => {
      res.sendOk({
        message : "Fetched data successfully",
        associatedetails : data
      });
    });
  }

  exports.getparticipationmetrics = function(req, res) {

    var _headcount = 0;
    var _uniquevolunteers = 0;
    var _totalvolunteeringhours = 0;
    var _totalvolunteers = 0;
    var _coverage = 0;
    var _avgfrequencypervolunteer = 0;
    var _avghoursperassociate = 0;
    var _avghourspervolunteer = 0;
    var _events = 0;
    //var _totalnoofevents = 0;
    var _avghoursperevent = 0;
    var _avgnoofvolunteersattendedperevent = 0;
    var _avghoursvolunteeredpervolunteerperevent = 0; 
    
    getHeadCount(function(headCount, err) {
      _headcount = headCount;
      if(!err) {
        getUniqueVolunteers(function(uniqueVolunteers, err) {
          _uniquevolunteers = uniqueVolunteers;
          _coverage = _uniquevolunteers / _headcount;
          
          console.log('Coverage:'+_coverage);
          if(!err) {
            getTotalVolunteeringHours(function(totalvolunteeringhours, err) {
              _totalvolunteeringhours = totalvolunteeringhours;

              if(!err) {
                getTotalVolunteers(function(totalvolunteers, err) {
                  _totalvolunteers= totalvolunteers;
                  _avgfrequencypervolunteer = _uniquevolunteers/_totalvolunteers;
                  _avghoursperassociate = _totalvolunteeringhours/_headcount;
                  _avghourspervolunteer = _totalvolunteeringhours/_uniquevolunteers;
                  

                  if(!err) {
                    getTotalNoOfEvents(function(events, err) {
                      _events = events;
                      _avghoursperevent = _totalvolunteeringhours/_events;
                      _avgnoofvolunteersattendedperevent = _totalvolunteers/_events;

                      return res.sendOk({
                        message : "Fetched data successfully",
                        headcount : _headcount,
                        uniquevolunteers : _uniquevolunteers,
                        totalvolunteeringhours : _totalvolunteeringhours,
                        avgfrequencypervolunteer : _avgfrequencypervolunteer,
                        avghoursperassociate :_avghoursperassociate,
                        avghourspervolunteer : _avghourspervolunteer,
                        events : _events,
                        avghoursperevent : _avghoursperevent,
                        avgnoofvolunteersattendedperevent : _avgnoofvolunteersattendedperevent,
                        coverage : _coverage,
                      });
                    });
                  }
                });
              }
              
            });
          }

          
        })
      }
      
    });

  }

  function getHeadCount(callback) {
    var _headcount = 0
    try {
      AssociateDetails.distinct('associateid').exec(function (err, result) {
        _headcount = result.length;
        console.log("----->"+_headcount);
        callback(_headcount,false);
      });
      
    } catch(e) {
      callback(_headcount,true);
    }
    
  }

  function getUniqueVolunteers(callback) {
    var _uniquevolunteers = 0;
    try {
      EventDetails.distinct('employeeid').exec(function (err, result) {
        _uniquevolunteers = result.length;
        console.log("----->"+_uniquevolunteers);
        callback(_uniquevolunteers,false);
      });
    } catch(e) {
      callback(_uniquevolunteers,true);
    }
    
  }

  function getTotalNoOfEvents(callback) {
    var _events = 0;
    try {
      EventSummary.distinct('eventid').exec(function (err, result) {
        _events = result.length;
        console.log("----->"+_events);
        callback(_events,false);
      });
    } catch(e) {
      callback(_events,true);
    }
    
  }

  function getTotalVolunteeringHours(callback) {
    var _totalvolunteeringhours = 0;
    try{
      EventSummary.aggregate([{
        $group : {
          _id : null,
          total: {$sum: "$overallvolunteeringhrs"}
        }
      }]).then(data => {
        console.log("-----Volunteerringhours>"+data);
        _totalvolunteeringhours = data[0].total;
        callback(_totalvolunteeringhours,false);

      });
    } catch(e) {
      callback(_totalvolunteeringhours,true);
    }
  }

  function getTotalVolunteers(callback) {
    var _totalvolunteers = 0;
    try{
      EventSummary.aggregate([{
        $group : {
          _id : null,
          total: {$sum: "$totalnoofvolunteers"}
        }
      }]).then(data => {
        console.log("-----Volunteerringhours>"+data);
        _totalvolunteers = data[0].total;
        callback(_totalvolunteers,false);

      });
    } catch(e) {
      callback(_totalvolunteers,true);
    }
  }

  function getCovergae() {
    console.log(_uniquevolunteers);
      console.log(_headcount);
  }