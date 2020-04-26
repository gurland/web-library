import { Observer } from "./services/observer";
// import path = require('path');

// console.log(path.dirname(String(require.main?.filename)));

var observer = new Observer();
const dir = "upload";

observer.watchFolder(dir);

// TODO: make parser async

// import express = require('express');

// const app: express.Application = express();

// app.get('/', function (req, res) {
// 	let ans = parser.getAuthor();

// 	console.log(parser.getAuthor());
// 	res.send(`${ans}`);
// });

// app.listen(3000, function () {
// 	console.log('App is listening on port 3000!');
// });
