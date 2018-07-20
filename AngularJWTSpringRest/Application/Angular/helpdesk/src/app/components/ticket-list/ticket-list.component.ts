import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { DialogService } from '../../services/dialog.service';
import { TicketService } from '../../services/ticket/ticket.service';
import { Ticket } from '../../model/ticket.model';
import { ResponseApi } from '../../model/response-api.model';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  public assignedToMe: boolean = false;
  public page: number = 0;
  public count: number = 5;
  public pages: Array<number>;
  public shared: SharedService;
  public message: {};
  public classCss: {};
  public listTicket = [];
  public ticketFilter = new Ticket('', null, '', '', '', '', null, null, null, null, '');

  constructor(private dialogService: DialogService, private ticketService: TicketService, private router: Router) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  findAll(page: number, count: number) {
    this.ticketService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listTicket = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      /*console.log(err);*/
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  filter(): void{
    this.page = 0;
    this.count = 5;
    this.ticketService.findByParameters(this.page, this.count, this.assignedToMe, this.ticketFilter).subscribe((responseApi: ResponseApi) => {
      this.ticketFilter.number = this.ticketFilter.number == 0 ? null : this.ticketFilter.number;
      this.ticketFilter.title = this.ticketFilter.title == 'uninformed' ? '' : this.ticketFilter.title;
      this.listTicket = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      /*console.log(err);*/
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  cleanFilter(){
    this.assignedToMe = false;
    this.page = 0;
    this.count = 5;
    this.ticketFilter = new Ticket('', null, '', '', '', '', null, null, null, null, '');
    this.findAll(this.page, this.count);
  }

  edit(id: string) {
    this.router.navigate(['/ticket-new', id]);
  }

  detail(id: string) {
    this.router.navigate(['/ticket-detail', id]);
  }

  delete(id: string) {
    this.dialogService.confirm('Do you want to delete the ticket?').then((canDelete: boolean) => {
      if (canDelete) {
        this.message = {};
        this.ticketService.delete(id).subscribe((responseApi: ResponseApi) => {
          this.showMessage({
            type: 'success',
            text: 'Ticket deleted successfully!'
          })
          this.findAll(this.page, this.count);
        }, error => {
          this.showMessage({
            type: 'error',
            text: error['error']['errors'][0]
          });
        });
      }
    });
  }

  setNextPage(event: any) {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page++;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page--;
      this.findAll(this.page, this.count);
    }
  }

  setPage(num_page: number, event: any, ) {
    event.preventDefault();
    this.page = num_page;
    this.findAll(this.page, this.count);
  }

  public showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }
}
