/*
Types accepted by TypeScript:

string
number
boolean
arrays
Classes
Any
*/

function showLog(message: any){
    console.log(message);
}

let test: Array<string> = ['Hello Guys!', 'Test'];
let isEnable: boolean = true;
let test2: [string, string] = ['Hello Guys!','Test'];

showLog(test);
showLog(isEnable);
showLog(test2);