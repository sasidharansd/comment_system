import { Injectable, computed, signal } from '@angular/core';
import { Comment } from '../models/comments.model';
import { mockCommentsJSON } from '../mock/comments-mock';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  public comments = signal<Comment[]>([]);
  public commentsList = computed(() => this.comments());
  public parentCommentsList = computed(() => this.comments().filter(comment => !comment.parentId));
  public replyCommentsList = computed(() => this.comments().filter(comment => comment.parentId));
  constructor(private readonly localStorageService: LocalStorageService) { }

  public getCommments() {
    return computed(() => this.comments())();
  }

  public setMockComments(): void {
    const localComments = this.localStorageService.getItem('comments') as Comment[];
    this.comments.set(localComments ?? (JSON.parse(JSON.stringify(mockCommentsJSON))) as Comment[]);
    if (!localComments) {
      this.updateCommentsInLocalStorage();
    }
  }

  public addComment(comment: Comment) {
    const lastId = this.getlastCommentId();
    comment.id = String(lastId + 1);
    this.comments.update(comments => [...comments, comment]);
    this.updateCommentsInLocalStorage();
  }

  private getlastCommentId(): number {
    const comments = this.comments();
    const commentsLen = comments.length ?? 0;
    return commentsLen ? Number(comments[commentsLen - 1].id) : 0;
  }

  public updateCommentContent(id: string, content: string,): void {
    const comments = this.comments();
    const commentToUpdate = comments.find((comment) => comment.id === id);
    if (commentToUpdate) {
      commentToUpdate.content = content;
      commentToUpdate.isEdited = true;
      this.comments.update(comments => [...comments]);
    }
    this.updateCommentsInLocalStorage();
  }

  private updateCommentsInLocalStorage(): void {
    this.localStorageService.setItem('comments', this.comments());
  }
}
