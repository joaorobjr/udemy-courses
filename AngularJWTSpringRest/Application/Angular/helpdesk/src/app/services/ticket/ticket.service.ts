import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HELP_DESK_API_TICKET } from '../helpdesk.api';
import { Ticket } from '../../model/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {}

  createOrUpdate(ticket: Ticket){
    if(ticket.id != null && ticket.id != ''){
      return this.http.put(`${HELP_DESK_API_TICKET}`, ticket);
    }else{
      ticket.id = null;
      ticket.status = 'New'
      return this.http.post(`${HELP_DESK_API_TICKET}`, ticket);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${HELP_DESK_API_TICKET}/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${HELP_DESK_API_TICKET}/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${HELP_DESK_API_TICKET}/${id}`);
  }

  findByParameters(page: number, count: number, assignedToMe: boolean, ticket: Ticket){
    ticket.number = ticket.number == null ? 0 : ticket.number;
    ticket.title = ticket.title == '' ? 'uninformed' : ticket.title;
    ticket.status = ticket.status == '' ? 'uninformed' : ticket.status;
    ticket.priority = ticket.priority == '' ? 'uninformed' : ticket.priority;
    return this.http.get(`${HELP_DESK_API_TICKET}/${page}/${count}/${ticket.number}/${ticket.title}/${ticket.status}/${ticket.priority}/${assignedToMe}`);
  }

  changeStatus(status: string, ticket: Ticket){
    return this.http.put(`${HELP_DESK_API_TICKET}/${ticket.id}/${status}`, ticket);
  }

  summary(){
    return this.http.get(`${HELP_DESK_API_TICKET}/summary`);
  }
}
