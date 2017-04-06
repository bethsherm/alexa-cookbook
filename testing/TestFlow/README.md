## TestFlow <a id="title"></a>

In the main [testing](../testing) folder, we see several examples of how to test your code with one specific event.
This is useful if you have a specific test state you need to reproduce and debug.

Many skills are designed to have a conversation with the user involving multiple steps.
A skill may prompt the user for inputs early in the conversation, store the responses in session attributes, and use the values to look up data or perform an action.
Game skills will keep track of user names, current scores, high scores, etc.
As a developer, in order to visualize the state of session attributes throughout a long skill session, it helps to be able to run a pre-defined sequence of events and observe the state of the attributes at each point.

This tutorial will show you an easy way to define, run, and view test sequences against your skill code.

<img src="https://m.media-amazon.com/images/G/01/cookbook/testflow_default._TTH_.png" alt="TestFlow" width="411" height="245">

**```testflow.js```** is a Javascript script designed to be run from the command line.  The script will access two other files:
 * Your ```src/index.js``` skill source code
 * A dialog sequence file, such as  ```dialogs/staterequest.txt```


#### Dialog Sequence File
Define a text file with your skill's input events.
Put one Request or Intent per line.  This corresponds to each of the Intent requests your code expects to receive from the Alexa service.

For example: *default.txt*

```
LaunchRequest
AMAZON.HelpIntent
AMAZON.CancelIntent
AMAZON.StopIntent
```

Another example: *staterequest.txt*

```
LaunchRequest
StateRequestIntent usstate=Vermont
StateRequestIntent usstate=New%20York
ISeeIntent animal=bear color=brown
AMAZON.HelpIntent
AMAZON.StopIntent
MyNameIsIntent myName=
MyNameIsIntent myName=Madeline
StateRequestIntent usstate=Texas
RecapIntent
AMAZON.StopIntent
```

Notice that slot values with spaces need to be encoded.  Just insert ```%20``` to replace any white spaces, such as in ```usstate=New%20York```

#### Running the test

1. Open a Terminal prompt (DOS prompt, or cmd.exe in Windows).
1. Change directory to the folder: ```alexa-cookbook/testing/TestFlow```
1. Type ```node testflow```
  + You should see requests and responses for each of the default Request types
1. Type ```node testflow staterequest.txt```
  + You should see request and Intents, slot values, session attributes, and output speech.


<img src="https://m.media-amazon.com/images/G/01/cookbook/testflow1._TTH_.png" alt="TestFlow" width="346" height="288">


#### Customizing the output
At the top of the ```testflow.js``` file, notice a set of options you can define.
You may change any of these to ```true``` or ```false```.

```javascript
// Toggle on or off various debugging outputs
const options = {
    speechOutput : true,  // the cyan text you hear the Echo say
    slots        : true,  // key/value pairs shown in blue and green
    attributes   : true,  // session.attributes shown in magenta
    stdout       : false  // console.log() messages or errors, shown in white
};
```

#### Session Attributes
Notice in magenta (purple) the session attributes that store values your skill is designed to remember.
By default, this object is empty ```{}```

Each new request uses the session attributes object from the previous session's output.
The skill code may add or modify the session attributes.  Look for any changes in the attributes after each Intent.
If your skill causes the session to end, such as when an ```AMAZON.StopIntent``` handler calls ```this.emit(':tell' )```, the session attributes will be lost.
If your skill uses an AWS DynamoDB table, however, you can expect the session attributes to be saved and re-loaded after each session ends, within the actual AWS Lambda environment.


#### Try it on your code
1. Copy and paste the ```testflow.js``` file and ```/dialogs``` folder to your project folder, next to your ```/src``` folder.
1. Customize the settings within the top of the ```testflow.js``` file
1. Create a new dialog sequence file with your Intents in sequence, such as ```mytest.txt```
1. Run from the command line: ```node testflow mytest.txt```

<hr />

Back to the [Home Page](../../README.md#title)

