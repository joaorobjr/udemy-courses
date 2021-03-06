import { Component } from '@angular/core';
import { SharedService } from './services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'HelpDesk';
  showTemplate: boolean = false;
  public shared: SharedService;

  constructor(){
    this.shared = SharedService.getInstance();
  }

  ngOnInit(){
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    );
  }

  showClassContentWrapper(){
    return{
      'content-wrapper' : this.shared.isLoggedIn()
    }
  }
}
