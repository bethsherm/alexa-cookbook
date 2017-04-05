var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){

    var alexa = Alexa.handler(event, context);
    // alexa.appId = "amzn1.echo-sdk-ams.app.8c97fc78-342a-4e4f-823b-e2f91e7f0000";
    console.log('console.log() status message from index.js');

    alexa.registerHandlers(handlers);
    alexa.execute();

};

var handlers = {
    'LaunchRequest': function () {
        var say = 'Welcome to the Alexa skill!';
        this.emit(':ask', say, 'try again');
    },

    'StateRequestIntent': function() {
        var say = '';

        if (this.event.request.intent.slots.usstate) {
            var myState = this.event.request.intent.slots.usstate.value;

            say = 'Okay great! You asked for ' + myState;

            // create and store session attributes
            if (!this.attributes['myList']) {
                this.attributes['myList'] = [];  // empty array
            }

            this.attributes['myList'].push(myState);  // add array element
        } else {
            say = 'I did not hear the name of the state.'
        }

        this.emit(':ask', say, 'try again');

    },
    'MyNameIsIntent': function() {

        var myName = '';
        var say = '';

        if (this.event.request.intent.slots.myName) {
            myName = this.event.request.intent.slots.myName.value;
            this.attributes['myName'] = myName;
            say = 'Hi ' + myName + '!';

        } else {
            say = 'You can tell me your name, for example, you can say my name is Danielle.';
        }
        //this.event.request.intent.slots.myName.value;

        this.emit(':ask', say, 'try again');
    },
    'ISeeIntent': function() {
        var say = '';

        if (this.event.request.intent.slots.color && this.event.request.intent.slots.animal) {
            var myColor = this.event.request.intent.slots.color.value;
            var myAnimal = this.event.request.intent.slots.animal.value;

            say = 'You saw a ' + myColor + ' ' + myAnimal;
        }

        this.emit(':ask', say, 'try again');

    },
    'RecapIntent': function() {

        // create and store session attributes
        if (!this.attributes['myList']) {
            this.attributes['myList'] = [];  // empty array
        }

        var stateList  = this.attributes['myList'].toString();  // add array element
        var stateCount =  this.attributes['myList'].length;

        var say = 'Your list has the following ' + stateCount + ' states. ' + stateList;

        this.emit(':ask', say, 'try again');
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', 'Say the name of a U.S. State, for example, say, go to Florida.', 'try again');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye');

    },
    'AMAZON.StopIntent': function () {
        var say = '';
        var myName = '';
        if (this.attributes['myName'] ) {
            myName = this.attributes['myName'];
        }
        say = 'Goodbye, ' + myName;

        this.emit(':tell', say );
    },
    'Unhandled': function() {

        this.emit(':ask', 'Sorry, unhandled intent ' + JSON.stringify(this.event.request) + ' error. Try again?', 'Please try again?');

    }
};

// end of handlers

// ---------------------------------------------------  User Defined Functions ---------------
