var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for userid:session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },

    'GetNewFactIntent': function () {
        var say = 'Here is your fact. ' + getFact();
        this.emit(':tell', say );
    },

    // 'AMAZON.HelpIntent': function () {
    //     this.emit(':ask', 'you can ask for a fact by saying, tell me a fact.', 'try again');
    // },

    // 'AMAZON.CancelIntent': function () {
    //     this.emit(':tell', 'Goodbye');
    // },

    // 'AMAZON.StopIntent': function () {
    //     this.emit(':tell', 'Goodbye');
    // }
};

//  helper functions  ===================================================================

function getFact() {
    var newFact = 'You can build new voice experiences with the Alexa Skills Kit';
    return newFact;
}
