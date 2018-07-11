import { Comment } from './comment.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from '../../../node_modules/rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: Http) { }

  getComments(): Observable<Comment[]>{
    return this.http.get('https://jsonplaceholder.typicode.com/comments').pipe(map(response => response.json()));
  }
}
