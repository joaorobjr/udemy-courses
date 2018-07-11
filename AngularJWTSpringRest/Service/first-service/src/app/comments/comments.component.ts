import { Comment } from './comment.model';
import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Comment[];
  
  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.commentsService.getComments().subscribe(comments => this.comments = comments);
  }

}
