import { Person } from '../classes/person';
import { DaoInterface } from './dao.interface';

export class PersonDao implements DaoInterface {

    tableName: string;

    insert (object: Person): boolean {
        console.log('Inserting...', object.toString());
        return true;
    }
    update (object: any): boolean{
        return true;
    }

    delete (id: number): boolean{
        return true;
    }

    find (id: number): any{
        return new Person('João França');
    }

    findAll(): [Person]{
        return [new Person('João Robson')];
    }

}