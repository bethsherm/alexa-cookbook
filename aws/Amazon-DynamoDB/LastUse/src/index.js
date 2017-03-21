var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.dynamoDBTableName = 'YourTableName'; // creates new table for userid:session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {

    'NewSession': function() {
        // any previous session attributes are now loaded from Dynamo into the session attributes

        var todayNow = new Date();

        if(this.attributes['timestamp']) {  // user must have been here before
            var dateLast = new Date(this.attributes['timestamp']);
            var timeSpanMS = todayNow.getTime() - dateLast.getTime();
            var timeSpanHR = Math.floor(timeSpanMS / (1000 * 60 * 60));
            var timeSpanMIN = Math.floor(timeSpanMS / (1000 * 60 ));

            this.attributes['hoursSinceLast'] = timeSpanHR;
            this.attributes['minutesSinceLast'] = timeSpanMIN;

            var launchCount = this.attributes['launchCount'];
            this.attributes['launchCount'] = parseInt(launchCount) + 1;

        } else {  // first use
            this.attributes['hoursSinceLast'] = 0;
            this.attributes['minutesSinceLast'] = 0;
            this.attributes['launchCount'] = 0;

        }

        this.attributes['timestamp'] = todayNow;

        this.emit('MyIntent');

    },

    'LaunchRequest': function () {  // happens when the user launches the skill but does not say their first question or command
        this.emit('MyIntent');
    },

    'MyIntent': function () {

        var say = 'hello and welcome';

        this.emit(':ask', say, 'try again');
    },
    'WhatsUpIntent': function () {

        this.emit(':ask', 'hey friend, how are you today?', 'try again');

    },
    'MyNameIsIntent': function () {
        var myName = this.event.request.intent.slots.firstname.value;
        this.attributes['name'] = myName;
        this.emit(':ask', 'hello, ' + myName, 'try again');

    },
    'AMAZON.HelpIntent': function () {
        var myName = '';
        if (this.attributes['name']) {
            myName = this.attributes['name'];
        }

        var min = this.attributes['minutesSinceLast'];


        this.emit(':ask', 'it has been ' + min + ' minutes. here is the help for you, ' + myName, 'try again');

    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'you asked to Cancel, goodbye', 'try again');
    },
    'AMAZON.StopIntent': function () {

        var myName = '';
        if (this.attributes['name']) {
            myName = this.attributes['name'];
        }
        this.emit(':tell', 'goodbye, ' + myName, 'try again');
    },
};

function randomPhrase(myData) {
    // the argument is an array [] of words or phrases

    var i = 0;

    i = Math.floor(Math.random() * myData.length);

    return(myData[i]);
}
