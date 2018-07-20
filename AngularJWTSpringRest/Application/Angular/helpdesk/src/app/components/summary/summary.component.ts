import { ResponseApi } from './../../model/response-api.model';
import { TicketService } from './../../services/ticket/ticket.service';
import { Summary } from './../../model/summary.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  public summary: Summary = new Summary();
  public message = {};
  public classCss = {};

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.summary().subscribe((responseApi: ResponseApi) =>{
      this.summary = responseApi.data;
    }, err => {

    });
  }

  private showMessage(message: {type: string, text: string} ): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  private buildClasses(type: string):void{
    this.classCss = {
        'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }
}
