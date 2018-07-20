import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public shared: SharedService;
  
  constructor() { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

}
