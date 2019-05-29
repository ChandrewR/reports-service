var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('ParticipationMetrics', new Schema(
    {
        headcount : Number,
        uniquevolunteers : Number,
        totalvolunteeringhours : Number,
        coverage : Number,
        avgfrequencypervolunteer : Number,
        avghoursperassociate : Number,
        avghourspervolunteer : Number,
        totalnoofevents : Number,
        avghoursperevent : Number,
        avgnoofvolunteersattendedperevent : Number,
        avghoursvolunteeredpervolunteerperevent : Number

    }
));