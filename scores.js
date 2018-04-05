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
        if (resources[req.url] === undefined) {
            res.statusCode = 404;
        }
        if (scores.length == 3) {
            scores.pop();
        }
    }

    scores.sort(compare);
    function compare(a, b) {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;
    }

    res.end(JSON.stringify(scores));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});