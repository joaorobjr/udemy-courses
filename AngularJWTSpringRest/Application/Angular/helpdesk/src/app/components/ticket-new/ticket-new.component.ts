import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../model/ticket.model';
import { SharedService } from '../../services/shared/shared.service';
import { TicketService } from '../../services/ticket/ticket.service';
import { ResponseApi } from '../../model/response-api.model';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  public ticket = new Ticket('', 0, '', '', '', '', null, null, null, null, '');
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
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi: ResponseApi) => {
      this.ticket = new Ticket('', 0, '', '', '', '', null, null, null, null, '');
      let ticket: Ticket = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Ticket ${ticket.number} created successfully!`
      });
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  onFileChange(event): void {
    if (event.target.files[0].size > 2000000) {
      this.showMessage({
        type: 'error',
        text: 'Maximum image size is 2MB'
      });
    } else {
      this.ticket.image = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.ticket.image = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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

  cancelRegister() {
    this.ticket = new Ticket('', 0, '', '', '', '', null, null, null, null, '');
    this.message = {};
    this.classCss = {};
    this.router.navigate(['/']);
  }
}
