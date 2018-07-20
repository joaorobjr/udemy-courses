"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var person_1 = require("./../classes/person");
var dao_1 = require("./../generics/dao");
var dao = new dao_1.Dao();
var person = new person_1.Person('Junior');
dao.insert(person);
//# sourceMappingURL=main.js.map