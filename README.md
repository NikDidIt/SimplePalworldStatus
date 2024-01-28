# Simple Palworld Server Status Page

Uses RCON to connect to the server and get a player list. This is for the dedicated Server.

Install run `npm install`

Start `node status.js`

## Setup

* In your Palworld server config you need to have the following options set

  * AdminPassword="password" --Set to any password you want to use. It will also need to be updated in status.js
  * RCONEnabled=True -- This must be True
  * RCONPort=25575 --Any port. If you are running remotly make sure the port is open on the firewall. It will also need to be updated in status.js
* In status.js check these items specifically based on your setup


| Item                | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| `port`              | Port used for the node app                                                 |
| `palWorld.host`     | Palworld server hostname or IP                                             |
| `palWorld.port`     | Palworld server RCONPort                                                   |
| `palWorld.password` | Palworld Server AdminPassword                                              |
| `msg.contact`       | Who and how to contact if server is down                                   |
| `msg.connectInfo`   | Hostname or IP and port for connecting the Palworld server for new uesers. |
