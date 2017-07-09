"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bp = require("body-parser");
var db = require("./db/models");
var apirouters = require("./routers/api");
console.log(db);
var app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/api', apirouters);
app.listen(8000, function (req, res, next) {
    console.log('Server Listening at 8000');
});
//# sourceMappingURL=server.js.map