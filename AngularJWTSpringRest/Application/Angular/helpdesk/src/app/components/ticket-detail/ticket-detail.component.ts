import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Ticket } from '../../model/ticket.model';
import { SharedService } from '../../services/shared/shared.service';
import { TicketService } from '../../services/ticket/ticket.service';
import { ResponseApi } from '../../model/response-api.model';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  public ticket = new Ticket('', null, '', '', '', '', null, null, null, null, '');
  public shared: SharedService;
  public message: {};
  public classCss: {};

  constructor(private ticketService: TicketService, private route: ActivatedRoute, private router: Router) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.ticketService.findById(id).subscribe((resposeApi: ResponseApi) => {
      this.ticket = resposeApi.data;
      this.ticket.date = new Date(this.ticket.date).toISOString();
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  changeStatus(status: string): void {
    this.ticketService.changeStatus(status, this.ticket).subscribe((resposeApi: ResponseApi)=> {
      this.ticket = resposeApi.data;
      this.ticket.date = new Date(this.ticket.date).toISOString();
      this.showMessage({
        type: 'success',
        text: 'Status changed successfully'
      });
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
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

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

  backToList() {
    this.ticket = new Ticket('', null, '', '', '', '', null, null, null, null, '');
    this.message = {};
    this.classCss = {};
    this.router.navigate(['/ticket-list']);
  }

}
