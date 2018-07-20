import { Component, OnInit } from '@angular/core';
import { Task } from './task';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent  {

  tasks = [];
  task = "";
  id = 0;
  isAdmin: boolean = true;
  
  add(): void {
    let task: Task = new Task(this.id, `${this.task} ${this.id}`);
    this.id++;
    this.tasks.push(task);
  }
}
