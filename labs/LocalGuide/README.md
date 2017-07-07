
# Labs: <a id="title">Local Guide</a>

## What can I do in {town}? <a id="intro"></a>

Local Guide is a skill that gives you suggestions on where to visit and dine in your local city or town.
You can install the skill, and then update the Javascript code to make the skill an expert on what to do in your favorite location.

### Installation
Install this skill to learn more about a particular city: Gloucester, Massachusetts.
The instructor will walk you through the high level steps:
1. Copy and paste the ```speechAssets/InteractionModel.json``` contents into a new skill in Skill Builder Beta.
1. Copy the ```src/index.js``` code into a new AWS Lambda function that is based on the **Fact** blueprint.

Practice speaking to the skill a few times to learn all the features of the skill.
When you ask for a meal such as "breakfast", the skill will scan the list of restaurants serving breakfast and choose one at random.  When you say "go outside" you should hear the current weather conditions.


### Test
1. Be sure you have installed Node.JS on your laptop.
1. With the alexa-cookbook previously downloaded to a folder your laptop, open a command prompt and navigate to the cookbook folder (labs/LocalGuide/src).  Type in ```npm install```
1. Next, navigate back up to the (labs/LocalGuide) folder.  Type in ```node testflow```
You should see a sequence of skill events be tested and the corresponding output.
This will look best with a black-background command prompt.

### Lab 1: Customize this skill for your city or town
Think of your hometown, current city, or favorite city.  Jot down a list of your favorite restaurants and attractions.

Open your Lambda function and click on the Code tab.  Review the first section of the code that is customized for Gloucester.
There are static data blocks called ```languageStrings```, and a ```data {}``` object containing details and lists.
Carefully modify these green strings within the quotes to define the city, state, zip, restaurants, and attractions custom to your particular town.
Be sure to maintain quotes around all strings.  Single or double quotes around strings are both valid (```"``` or ```'```). Ensure all objects ```{key:value}``` and lists ```[item1, item2]``` are properly nested and terminated, as in the starting code sample.

Click **Save** to save the changes to your Lambda function.
[Test](https://github.com/alexa/alexa-cookbook/tree/master/testing) your function.
If it works well, please [publish your skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/publishing-an-alexa-skill)  for the world to enjoy.


### Lab 2: Add a new Intent with Slot
Review the Intent called AttractionIntent.  It has a slot called "distance" which is defined as type ```AMAZON.NUMBER```

The sample utterance looks like this:

```AttractionIntent recommend an attraction within {distance} miles```

Within the Lambda code, we access the value of this slot via the following code:

```
        var distance = 200;
        if (this.event.request.intent.slots.distance.value) {
            distance = this.event.request.intent.slots.distance.value;
        }
```
We have code that validates the distance and substitutes a default distance in case the user says something that matches the Intent but they fail to say the slot value.


Add a new Intent and Slot of your own!  Just think of a new question a user might ask.  Give the question an Intent name.
Within the question, identify a slot that behaves like a variable, wildcard, or parameter.
You can plan to use slot types such as ```AMAZON.US_STATE```, ```AMAZON.US_FIRST_NAME```, ```AMAZON.MusicGroup```, etc.
See the [full list](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference).

You can also create your own slot type within the Interaction Model page.
For example, you could create a slot type called LIST_OF_BIRDS with values "cardinal", "blue jay", "robin", etc.
Once this list has been created, you could define a new slot called "bird" that is type LIST_OF_BIRDS.

**Within your Lambda code, copy the format of the ```AttractionIntent``` function definition to create a new handler with the same name as your new Intent.**

**Customize the logic in your handler to retrieve the slot value, and add logic to say a response back to the user.**


### Lab 3: Extend the skill logic with smart recommendations
When the user says "go outside", the ```GoOutIntent``` intent is called and the code in the GoOutIntent handler block is executed.
This makes an API call over the Internet to a service that returns the weather and current time in your city.

You can enhance this handler code to make a relevant activity suggestion to the user.
For example, add a feature to decide, based on current time and weather conditions, whether to:

 * Go out to a local beach or park
 * Recommend a movie theatre or mall
 * Attend a scheduled public event happening soon
 * Staying home to watch a movie on Amazon Prime
 * etc..

### Practice and Demo
Practice all the features of your skill.  You can use [EchoSim.IO](https://echosim.io), the Amazon shopping app on your phone, or an Echo device.

Be ready to demo the skill to your fellow event attendees, friends, and family.  Ask them to try the skill and observe how they say their requests.

<hr />

Back to the [github.com/alexa/alexa-cookbook](https://github.com/alexa/alexa-cookbook) home page.

