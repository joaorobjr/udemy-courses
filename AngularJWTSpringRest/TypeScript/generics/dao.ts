import { DaoInterface } from './dao.interface';

export class Dao<T> implements DaoInterface<T> {

    tableName: string;

    insert (object: T): boolean {
        console.log('Inserting...', object.toString());
        return true;
    }

    update (object: T): boolean{
        return true;
    }

    delete (id: number): boolean{
        return true;
    }

    find (id: number): any{
        return null;
    }

    findAll(): [T]{
        return null;
    }
}