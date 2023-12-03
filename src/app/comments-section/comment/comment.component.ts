import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Comment } from '../../models/comments.model';
import { CommentsService } from '../../services/comments.service';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, ReplyComponent, MatIconModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() public comment: Comment;
  public isCommentEditInProgress = false;
  public commentEditForm = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });
  public isReplyInProgress = false;

  constructor(private readonly commentsService: CommentsService){}
  
  public replyComment(){
    this.isReplyInProgress = true;
  }

  public editComment() {
    this.commentEditForm.patchValue({
      comment: this.comment.content,
    });
    this.isCommentEditInProgress= true;
  }
  
  public updateComment(){
    if(this.comment.content !== this.commentEditForm.value.comment){
      this.commentsService.updateCommentContent(this.comment.id, this.commentEditForm.value.comment ?? "");
    }
    this.isCommentEditInProgress = false;
  }

  public cancel(){
    this.isCommentEditInProgress = false;
    this.isReplyInProgress = false;
  }
}
