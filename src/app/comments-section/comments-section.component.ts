import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Comment } from '../models/comments.model';
import { CommentsService } from '../services/comments.service';
import { CommentComponent } from './comment/comment.component';
import { ReplyComponent } from './reply/reply.component';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, CommentComponent, ReplyComponent],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.scss'
})
export class CommentsSectionComponent implements OnInit{
  public comments: Comment;
  constructor(readonly commentsService: CommentsService){
  }
  
  public ngOnInit(): void {
      this.commentsService.setMockComments();
  }

  public getReplyItems(parentId: string): Comment[] {
    return this.commentsService.replyCommentsList().filter(comment => comment.parentId === parentId) ?? [];
  }
}
