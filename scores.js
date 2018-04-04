const jsonBody = require("body/json");
var scores = [{
    name: "Edwin",
    score: 50
}, {
    name: "David",
    score: 39
}];

var resources = {
    "/scores": `scores`,
};

const http = require('http');

const hostname = null;
const port = 3000;

const server = http.createServer((req, res) => {

    if (req.method === "GET") {
        if (resources[req.url] === undefined) {
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript');
        }
    } else if (req.method === "POST") {
        res.statusCode = 201;
        jsonBody(req, res, function (err, body) {
            scores.push(body);
        })
        if (scores.length == 3) {
            scores.shift();
        }
    }


    // console.log(keysorted)
    res.end(JSON.stringify(keysSorted));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});