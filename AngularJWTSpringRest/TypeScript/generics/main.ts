import { Person } from './../classes/person';
import { DaoInterface } from './../generics/dao.interface';
import { Dao } from './../generics/dao';

let dao: DaoInterface<Person> = new Dao<Person>();
let person = new Person('Junior');
dao.insert(person);