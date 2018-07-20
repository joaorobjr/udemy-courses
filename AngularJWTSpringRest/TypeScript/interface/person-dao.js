"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var person_1 = require("../classes/person");
var PersonDao = /** @class */ (function () {
    function PersonDao() {
    }
    PersonDao.prototype.insert = function (object) {
        console.log('Inserting...', object.toString());
        return true;
    };
    PersonDao.prototype.update = function (object) {
        return true;
    };
    PersonDao.prototype.delete = function (id) {
        return true;
    };
    PersonDao.prototype.find = function (id) {
        return new person_1.Person('João França');
    };
    PersonDao.prototype.findAll = function () {
        return [new person_1.Person('João Robson')];
    };
    return PersonDao;
}());
exports.PersonDao = PersonDao;
//# sourceMappingURL=person-dao.js.map