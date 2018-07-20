export class Task {

    private id: number=0;
    private desc: string;

    constructor(id:number, desc: string){
        this.id=id;
        this.desc=desc;
    }

    public getDesc(): string{
        return this.desc;
    }

    public toString():string {
        return `Task ID: ${this.id} - Task Desc: ${this.desc}`; 
    }
}