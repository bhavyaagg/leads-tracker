"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by championswimmer on 13/07/17.
 */
var server_1 = require("./server");
server_1.db.sync({ force: false }).then(function () {
    console.log('Database configured');
    server_1.app.listen(8000, function (req, res, next) {
        console.log('Server Listening at 8000');
    });
});
//# sourceMappingURL=index.js.map