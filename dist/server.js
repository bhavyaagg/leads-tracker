"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bp = require("body-parser");
var models_1 = require("./db/models");
exports.db = models_1.default;
var apirouters = require("./routers/api");
var app = express();
exports.app = app;
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/api', apirouters);
//# sourceMappingURL=server.js.map