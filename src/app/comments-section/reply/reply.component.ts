import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Comment } from '../../models/comments.model';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.scss'
})
export class ReplyComponent {
  @Input() parentId: string;
  public commentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required])
  });
  @Output() closeReplyEmit: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(private readonly commentsService: CommentsService){}

  public postReply(): void {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        id: '',
        name: this.commentForm.value.name.trim(),
        content: this.commentForm.value.comment.trim(),
        timestamp: new Date(),
        parentId: this.parentId,
        isEdited: false,
      };
      this.commentsService.addComment(newComment);
      this.closeReplyEmit.emit();
    }
  }

  public cancel(): void{
    this.closeReplyEmit.emit();
  }
}
