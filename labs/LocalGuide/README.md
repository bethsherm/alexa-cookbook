
### Alexa Skill Building Cookbook
## Labs <a id="title">Local Guide</a>


#### Welcome! <a id="intro"></a>

Local Guide is a skill that gives you suggestions on where to visit and dine in your local city or town.

#### Installation
Install this skill to learn more about Gloucester, Massachusetts.
Practice a few times to learn all the features of the skill.
When you ask for a meal such as breakfast, the skill will scan the list of restaurants serving breakfast and choose one at random.

#### Customize
Think of your hometown or favorite city.
You can publish a guide to various restaurants and attractions to let people know the best spots.

Find and change the name of the city and the local restaurant details within the code in index.js

#### Test
1. Be sure you have installed Node.JS on your laptop.
1. With the alexa-cookbook previously downloaded to a folder your laptop, open a command prompt and navigate to the cookbook folder (labs/LocalGuide/src).  Type in ```npm install```
1. Next, navigate back up to the (labs/LocalGuide) folder.  Type in ```node testflow```
You should see a sequence of skill events be tested and the corresponding output.
This will look best with a black-background command prompt.

#### Lab 1: Extend this skill
When the user says "go outside", the ```GoOutIntent``` intent is called.
This makes an API call over the Internet to an API that returns the weather and current time in your city.

You can add your own custom features to this skill.
For example, add a feature to decide, based on current time and weather conditions, whether to:

 * Go out to a local beach or park
 * Recommend a movie theatre or mall
 * Attend a scheduled public event happening soon
 * Staying home to watch a movie on Amazon Prime
 * etc..


<hr />

Back to the [github.com/alexa/alexa-cookbook](https://github.com/alexa/alexa-cookbook) home page.

