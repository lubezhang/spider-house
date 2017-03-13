"use strict"

let { HouseServer } = require("./lib/HouseServer");

let houseServer = new HouseServer();
houseServer.start();
// let AJK = require("./lib/house/AJK").AJK;
// let Fang = require("./lib/house/Fang").Fang;

// let AJKServer = new HouseServer(new AJK());
// AJKServer.start();

// let FangServer = new HouseServer(new Fang());
// FangServer.start();
