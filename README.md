# Asteroids - Multiplayer

<img src="https://user-images.githubusercontent.com/4879766/101141837-30485200-3658-11eb-8143-0ba5eb8b1bee.gif" width="200" />

This project is made with the purpose of studying [Nature Of Code](https://natureofcode.com/), and is a remix of [CodingTrain's Asteroids](https://github.com/CodingTrain/Asteroids) supporting **multiplayer**!

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

### How it works

**This project uses very simple game mechanics**. That is, it doesn't take into account some well-known multiplayer game methodologies such as input prediction and lag compensation.

Client mainly does three things:
- sends player input to the server approximately 60 times a second.
- listens for server's game data and updates its copy accordingly.
- draws the last received server data in ideally 60 fps.

Server mainly does two things:
- listens for clients' input data and updates game data accordingly.
- runs game logic (e.g. updating positions, detecting collisions etc) approx 60 times a second and sends updated game data to all connected sockets.

**This architecture will inevitably introduce lags** because client's game data will only be updated once it receives new server data, and server may respond slowly at any time. To compensate this, many multiplayer games use various methodologies like input prediction. However, I learned this very recently, unfortunately, and this project doesn't have them.

If you're also interested in learning multiplayer game mechanics, I highly recommend [this blog](http://buildnewgames.com/real-time-multiplayer/).
