# Neighborhood-Map
A project to help a friend to learn web development.

## A short brief from this project

### Tools in project
To make easier to learn i added some tools in this project.

#### Live Reload
Live Reload monitors changes in your source files and as soon as you save the file your browser is instantly updated without reloading the page.

#### WebPack
> Webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into one or more bundles.

My goal to add this tool is bacause it helps to eliminate the implicit dependency on sorted <script> tags in our markup. Instead of including many separate scripts we include single or few bundles using the same <script> tag.

#### Ecmascript 6 (ES6)
> ECMAScript 6, also known as ECMAScript 2015, is the latest version of the ECMAScript standard. ES6 is a significant update to the language, and the first update to the language since ES5 was standardized in 2009. Implementation of these features in major JavaScript engines is underway now.

#### Babel
Babel is a JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript that can run in any browser (even the old ones).

It makes available all the syntactical sugar that was added to JavaScript with the new ES6 specification, including classes, fat arrows and multiline strings.

### Directory Architecture (Boilerplate structure)

- src is the folder where your source code belongs.
- dist is the folder where the webpack build is. 

We have the following list of folders in src folder
 - assets
 
   Where yours css files are
 - helpers
 
   Contains files with specific goals and that can be shared by all the system. For example googlemaps.js that manages all interactions with Google Maps. 
 - models
 
   Contains all models source file
 - viewModels
 
   Contains all viewModels source file
 - views (**I need to finish this process**)
 
   Contains all html files for each component that will be added to your index.html. 


## What you need to know to build this project.

-  You need to install [node.js](https://nodejs.org/en/). 


## How to build 

- Install  node.js
- Clone this repo
- run in terminal `npm install`
- run in terminal `npm run start:dev` ( if you want to exit type cmd + c in terminal)


