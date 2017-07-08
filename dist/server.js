"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db = require('./../db/models.js');
var app = express();
app.listen(4000, function (req, res, next) {
    console.log('Server Listening at 4000');
});
//# sourceMappingURL=server.js.map