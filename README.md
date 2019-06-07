# Asteroids - Multiplayer

This project is made with the purpose of studying [Nature Of Code](https://natureofcode.com/), and is a remix of [CodingTrain's Asteroids](https://github.com/CodingTrain/Asteroids) supporting **multiplayer**!
You can try it [here](https://natureofjandi.com) 

(Note: server I'm using is located at Asia and is cheap, so it will introduce lags in far regions).

This project was built with React (ejected from [Create React App](https://github.com/facebook/create-react-app)), Typescript, Express and  WebSocket API.
No third party physics library is used. 
Though we can't use p5js with React, I made p5-alike function wrappers around Web Canvas API and used them instead of raw Canvas API because p5 functions looked more familiar to me.

You can build and run it yourself by doing so:
```
git clone https://github.com/giantsol/asteroids-multiplayer.git
cd asteroids-multiplayer
npm install # install necessary packages
npm start # this will start express server at localhost:3000
```

### Scripts:
- ```npm start```: run development build and start server at port 3000
- ```npm run start:production```: run production build and start server at port 3000
- ```npm run start:watch```: same as running ```npm start```, but in watch mode

### Structure:

Package structure is divided into three parts: **client**, **server**, and **shared**.

**Client** package contains client code and is made of React code.
The only thing it does here is *draw* the game data it receives from the server through websocket.

**Server** package is where all the game logic and calculations (e.g. updating positions, calculating collision etc) happen.
It updates game data at certain interval and sends it to connected sockets, with all the information client needs to draw the screen.

**Shared** package contains class/interface declarations used by both client and server, and also some utility functions.
For instance, DTO (Data Transfer Object) and websocket events are declared here.
