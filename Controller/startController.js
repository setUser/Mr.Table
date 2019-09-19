const http = require('http');
const qs = require("querystring");
const fs = require('fs');
const json = "./Resources/CaptainTables.json";
const json_defaut = "./Resources/CaptainTables_default.json";
const html = './View/index.html';
const css = './View/index.css';
const js = './View/index.js';
const png = './Resources/icon.png';
//-----------------------------------------------------------------------------
var CaptainTables;
fs.readFile(json, "utf8", (err, data) => {
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
    fs.writeFile(json, JSON.stringify(CaptainTables), err => {
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
        let body = "";
        req.on("data", data => { body += data });
        req.on("end", () => { setTable(qs.parse(body), res) });
    } else if (req.url == "/resetTables") {
        fs.readFile(json_defaut, "utf8", (err, data) => {
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
        fs.readFile(png, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write(data);
            res.end();
        });
    } else if (req.url == "/index.js") {
        res.writeHead(200, { 'Content-Type': 'text/js' });
        fs.readFile(js, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write(data);
            res.end();
        });
    } else if (req.url == "/index.css") {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fs.readFile(css, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile(html, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.write(data);
            res.end();
        });
    }
}).listen(8080);
//-----------------------------------------------------------------------------