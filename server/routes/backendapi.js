"use strict";
exports.__esModule = true;
var BackendApi = /** @class */ (function () {
    function BackendApi() {
    }
    BackendApi.prototype.test = function (req, res) {
        res.json('pippo');
    };
    return BackendApi;
}());
exports.BackendApi = BackendApi;
