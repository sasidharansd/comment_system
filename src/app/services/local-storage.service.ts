import { Injectable } from '@angular/core';
import { Comment } from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public setItem(key: string, commests: Comment[]): void {
    localStorage.setItem(key, JSON.stringify(commests));
  }
}
