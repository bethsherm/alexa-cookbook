// Test Flow - a multiple intent test script for Alexa Lambda code
// Launch from a Terminal Prompt.  Examples:
// node testflow
// node testflow staterequest.txt


// Toggle on or off various debugging outputs
const options = {
    speechOutput : true,
    slots        : true,
    attributes   : true,
    stdout       : true  // standard output  / console.log() in your code
};

var locale = 'en-US';

var fs = require("fs");
var MyLambdaFunction = require('./src/index.js'); // Your Lambda source with exports.handler

var MyDialog = './dialogs/default.txt';

if (process.argv[2]) {
    MyDialog = './dialogs/' + process.argv[2];
} 

console.log('Running test sequence from dialog file : ', MyDialog);
console.log();

const OriginalConsoleLog = console.log;


var slotname = '';
var slotvalue = '';
var sa = {};

var context = {
    'succeed': function (data) {

        if (data.response.shouldEndSession) {
            sa = {};
        } else {
            sa = data.sessionAttributes;
        }

        if (options.attributes) {
            console.log = OriginalConsoleLog;
            console.log('\x1b[35m%s\x1b[0m ', JSON.stringify(sa));  // JSON.stringify(sa, null, 2)); for formatted JSON
        }


        var textToSay = data.response.outputSpeech.ssml;
        textToSay = textToSay.replace('<speak>', '    ');
        textToSay = textToSay.replace('</speak>', '');

        if (options.speechOutput) {
            console.log = OriginalConsoleLog;
            console.log('\x1b[36m%s\x1b[0m ', textToSay);
        }

    },
    'fail': function (err) {
        console.log('context.fail occurred');
        console.log(JSON.stringify(err, null,'\t') );
    }

};

fs.readFile(MyDialog, function (err, data) {  // open dialog sequence file and read Intents

    var newSession = true;
    var request = {};

    var lineArray = data.toString().split('\n');

    for (var i = 0; i < lineArray.length; i++) {


        if (i > 0) {
            newSession = false;
        }

        var tokenArray = lineArray[i].split(' ');

        var requestType = tokenArray[0].replace('\r','');


        if (requestType =='LaunchRequest'

           ) {
            request =  {
                    "type": requestType,
                    "locale": locale
            };

            console.log(' ===== Request %s \x1b[31m\x1b[1m%s\x1b[0m', i+1, requestType);

        } else {
            var Intent = requestType;
            slotArray = [];
            console.log(' ====== Intent %s \x1b[33m\x1b[1m%s\x1b[0m', i+1, Intent);

            for(j = 1; j < tokenArray.length; j++) {

                var equalsPosition = tokenArray[j].indexOf('=');
                slotname = tokenArray[j].substr(0, equalsPosition);
                slotvalue = decodeURI(tokenArray[j].substr(equalsPosition+1, 300)).replace('\r','');

                if (options.slots) {
                    console.log('\x1b[34m%s :\x1b[0m\x1b[32m %s\x1b[0m ', slotname,  slotvalue  );
                }

                if (slotvalue != '') {
                    slotArray.push('"' + slotname + '": {"name":"' + slotname + '","value":"' + slotvalue + '"}');

                }

            }

            var slotArrayString = '{' + slotArray.toString() + '}';

            var slotObj = JSON.parse(slotArrayString);

            request =  {
                "type": "IntentRequest",
                "intent": {
                    "name": Intent,
                    "slots" : slotObj
                },
                "locale": locale
            };

        }

        var eventJSON =
            {
                "session": {
                    "sessionId": "SessionId.f9e6dcbb-b7da-4b47-905c.etc.etc",
                    "application": {
                        "applicationId": "amzn1.echo-sdk-ams.app.1234"
                    },
                    "attributes": sa,
                    "user": {
                        "userId": "amzn1.ask.account.VO3PVTGF563MOPBY.etc.etc"
                    },
                    "new": newSession
                },
                 request,
                "version": "1.0"
            };

        // call the function
        if (options.stdout) {
            MyLambdaFunction['handler'] (eventJSON, context, callback);

        }  else {

            console.log = function() {};
            MyLambdaFunction['handler'] (eventJSON, context, callback);
            console.log = OriginalConsoleLog;
        }

        console.log('--------------------------------------------------------------------------------');

        }

    });


function callback(error, data) {
    if(error) {
        console.log('error: ' + error);
    } else {
        console.log(data);
    }
};


//
// const fontcolor = {
//     Reset = "\x1b[0m",
//     Bright = "\x1b[1m",
//     Dim = "\x1b[2m",
//     Underscore = "\x1b[4m",
//     Blink = "\x1b[5m",
//     Reverse = "\x1b[7m",
//     Hidden = "\x1b[8m",
//
//     FgBlack = "\x1b[30m",
//     FgRed = "\x1b[31m",
//     FgGreen = "\x1b[32m",
//     FgYellow = "\x1b[33m",
//     FgBlue = "\x1b[34m",
//     FgMagenta = "\x1b[35m",
//     FgCyan = "\x1b[36m",
//     FgWhite = "\x1b[37m",
//
//     BgBlack = "\x1b[40m",
//     BgRed = "\x1b[41m",
//     BgGreen = "\x1b[42m",
//     BgYellow = "\x1b[43m",
//     BgBlue = "\x1b[44m",
//     BgMagenta = "\x1b[45m",
//     BgCyan = "\x1b[46m",
//     BgWhite = "\x1b[47m"
// };
