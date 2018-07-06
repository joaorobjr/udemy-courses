import { Component, OnInit } from '@angular/core';
import { isNgTemplate } from '../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  desc = null;

  constructor() { }

  ngOnInit() {
  }

  delete():void{
    let result: boolean = confirm('Are you sure do you want delete this item?');
    if(result == true){
      alert('Item deleted!');
    }else{
      alert('Item not deleted!');
    }
  }
}
