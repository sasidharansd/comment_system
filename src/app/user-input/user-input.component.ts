import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Comment } from '../models/comments.model';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, TextFieldModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss'
})
export class UserInputComponent {
  public commentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required])
  });
  constructor(private readonly commentsService: CommentsService){}

  public postComment(formDirective: FormGroupDirective): void {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        id: '',
        name: this.commentForm.value.name.trim(),
        content: this.commentForm.value.comment.trim(),
        timestamp: new Date(),
        parentId: null,
        isEdited: false,
      };
      this.commentsService.addComment(newComment);
      formDirective.resetForm();
    }
  }
}
