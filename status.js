const express = require('express');
const Rcon = require('rcon');

const app = express();
const port = 8000;

//connection info
const palWorld = {}
palWorld.host = "localhost";    //Hostname or IP for Palworld Server
palWorld.port = 25575;          //RCONPort
palWorld.password = "password"; //AdminPassword

//Messages
const msg = {};
msg.statusMessage = "Pal Server Status: ";
msg.up = "UP";
msg.down = "DOWN";
msg.line = "--------------------------------------------------";
msg.contact = "Contact <Who should check on the server>";
msg.connectInfo = "Connection information: <Hostname or IP with port information>";
msg.playerCount = "Current Player Count: ";
msg.bullet = " -- ";
msg.newLine = "\n";
let hitCounts = 0;

app.get('/', (req, res) => {    //main text page
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    //Connection option for RCON
    const options = {
        tcp: true,       // false for UDP, true for TCP (default true)
        challenge: true  // true to use the challenge protocol (default true)
    };
    const conn = new Rcon(palWorld.host, palWorld.port, palWorld.password, options);

    conn.on('auth', function() {
        //Since connected server is up, write out UP message and connection info
        res.write(`${msg.statusMessage}${msg.up}${msg.newLine}`);
        res.write(`${msg.line}${msg.newLine}`);
        res.write(`${msg.connectInfo}${msg.newLine}`);
        res.write(`${msg.line}${msg.newLine}`);
        //Make call to get current players
        conn.send("ShowPlayers");
    }).on('server', function(str) {
        //process player data
        playerData(res, str);
        res.end();
    }).on('response', function(str) {
        //process player data
        playerData(res, str);
        res.end();
    }).on('error', function(err) {
        //Couldn't connect server is probably down, 
        //write out down message and contact message
        res.write(`${msg.statusMessage}${msg.down}${msg.newLine}`);
        res.write(`${msg.line}${msg.newLine}`);
        res.write(`${msg.contact}${msg.newLine}`);
        res.end();
    }).on('end', function() {
        //console.log("Connection closed");
    });
      
    conn.connect();

    console.log(hitCounts++);
});

//process Player data
const playerData = (res, str) => {
    //process player data
    let playerData = str.toString().trim().split("\n");
    let players = [];
    playerData.forEach((element, index) => {
        if (index > 0) {
            players.push(element.toString().split(",")[0]);
        }
    })
    //Write count of players
    res.write(`${msg.playerCount}${players.length}${msg.newLine}`);
    //Write each player
    if (players.length > 0) {
        players.forEach((element) => {
            res.write(`${msg.bullet}${element}${msg.newLine}`);
        });
    }
}


app.listen(port, () => console.log(`listening on port ${port}!`));
