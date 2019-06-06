# Asteroids - Multiplayer

This project is made with the purpose of studying [Nature Of Code](https://natureofcode.com/), and is a remix of [CodingTrain's Asteroids](https://github.com/CodingTrain/Asteroids) supporting **multiplayer**!
You can try it [here](https://natureofjandi.com) (note: server I'm using is located at Asia and is rather cheap, so it may introduce lags in far regions).

This project was built with React(ejected from [Create React App](https://github.com/facebook/create-react-app)), Typescript, Express and  WebSocket API.
No third party physics library is used. 
Though we can't use p5js with React, I made p5-alike function wrappers around Web Canvas API and used them instead of raw Canvas API.
Cause p5 functions looked more familiar to me.

You can build and run it yourself by doing so:
```
git clone https://github.com/giantsol/asteroids-multiplayer.git
cd asteroids-multiplayer
npm install # install necessary packages
npm start # thiss will start express server at localhost:3000
```

### Scripts:
- ```npm start```: run development build and start server at port 3000
- ```npm run start:production```: run production build and start server at port 3000
