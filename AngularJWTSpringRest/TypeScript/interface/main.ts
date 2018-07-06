import { Person } from '../classes/person';
import { PersonDao } from './person-dao';
import { DaoInterface } from './dao.interface';

let personDao: DaoInterface = new PersonDao();
let person: Person = new Person('Robson');
personDao.insert(person);

