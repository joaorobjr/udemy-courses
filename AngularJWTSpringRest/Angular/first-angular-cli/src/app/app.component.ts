import { User } from './user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasks';
  upperText: string = "Display uppercase text";
  lowerText: string = "Display lowercase text";
  percentValue: number = 0.5;
  date: Date = new Date();
  money: number = 589;
  isAdmin2: boolean = true;
  profile: number = 0; 
  user: User = {
    name: 'Robson',
    age: 36
  }
}
