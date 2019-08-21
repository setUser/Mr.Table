var http = require('http');
var qs = require("querystring");
const fs = require('fs');
//-----------------------------------------------------------------------------
var CaptainTables;
fs.readFile("./Resources/CaptainTables.json", "utf8", (err, data) => {
    if (err) {
        throw err;
    }
    CaptainTables = JSON.parse(data);
});
//-----------------------------------------------------------------------------
function getTables(res) {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.write(JSON.stringify(CaptainTables));
    res.end();
}
function setTable(body, res) {
    console.log(body);
    CaptainTables[body.sector][body.table] = JSON.parse(body.state);
    saveJSON();
    getTables(res);
}
function saveJSON() {
    fs.writeFile("./Resources/CaptainTables.json", JSON.stringify(CaptainTables), err => {
        if (err) {
            console.log(err);
        }
    });
}
//-----------------------------------------------------------------------------
http.createServer((req, res) => {
    console.log(req.url)
    //-----------------------------------------------------------------------------
    if (req.url == "/getTables") {
        getTables(res);
    } else if (req.url == "/setTable") {
        var body = "";
        req.on("data", data => { body += data });
        req.on("end", () => { setTable(qs.parse(body), res) });
    } else if (req.url == "/resetTables") {
        fs.readFile("./Resources/CaptainTables_default.json", "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            CaptainTables = JSON.parse(data);
            saveJSON();
            getTables(res);
        });
        //-----------------------------------------------------------------------------
    } else if (req.url == "/Resources/icon.png") {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        fs.readFile('./Resources/icon.png', (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write(data);
            res.end();
        });
    } else if (req.url == "/index.js") {
        res.writeHead(200, { 'Content-Type': 'text/js' });
        fs.readFile('./View/index.js', (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write(data);
            res.end();
        });
    } else if (req.url == "/index.css") {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fs.readFile('./View/index.css', (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./View/index.html', (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write(data);
            res.end();
        });
    }
}).listen(8080);
//-----------------------------------------------------------------------------