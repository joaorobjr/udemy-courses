import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

  tasks = [];
  task = "";
  id = 0;
    
  constructor() { 
  }

  ngOnInit() {
    this.task = `Task Test`;
  }

  add(): void {
    let task: Task = new Task(this.id++, `${this.task} ${this.id}`);
    this.tasks.push(task);
  }
}
