## Testing <a id="title"></a>
### TestFlow

You can run your skill code through a sequence of events to see how the conversation session works.

![TestFlow](https://m.media-amazon.com/images/G/01/cookbook/testflow_default._TTH_.png)

**```testflow.js```** is a Javascript script designed to be run from the command line.
```testflow.js``` will open two files:
 * Your ```src/index.js``` skill source code
 * A dialog sequence file, such as  ```/dialogs/staterequest.txt```


#### Dialog Sequence File
You can define a text file with your skill's input events.
Put one Request or Intent per line.  This corresponds to each of the Intent requests your code expects to receive from the Alexa service.

For example:
*default.txt*

```
LaunchRequest
AMAZON.HelpIntent
AMAZON.CancelIntent
AMAZON.StopIntent
```

Another example:

*staterequest.txt*

```
LaunchRequest
StateRequestIntent usstate=Vermont
StateRequestIntent usstate=California
ISeeIntent animal=bear color=brown
AMAZON.HelpIntent
AMAZON.StopIntent
MyNameIsIntent myName=
MyNameIsIntent myName=Madeline
StateRequestIntent usstate=Texas
RecapIntent
AMAZON.StopIntent
```

#### Running the test

1. Open a Terminal prompt (DOS prompt, or cmd.exe in Windows).
1. Change directory to the folder: ```alexa-cookbook/testing/TestFlow```
1. Type ```node testflow```
  * You should see requests and responses for each of the default Request types
1. Type ```node testflow staterequest.txt```
  * You should see request and Intents, slot values, session attributes, and output speech.


![TestFlow](https://m.media-amazon.com/images/G/01/cookbook/testflow1._TTH_.png)

#### Customizing the output
At the top of the ```testflow.js``` file, notice a set of options you can define.
You may change any of these to ```true``` or ```false```.

```
// Toggle on or off various debugging outputs
const options = {
    speechOutput : true,  // the cyan text you hear the Echo say
    slots        : true,  // key/value pairs shown in blue and green
    attributes   : true,  // session.attributes shown in magenta
    stdout       : false  // console.log() messages or errors, shown in white
};
```

<hr />

Back to the [Home Page](../../README.md#title)

