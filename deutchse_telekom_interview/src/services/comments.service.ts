import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Comment {
  public postId: number;
  public id: number;
  public name: string;
  public email: string;
  public body: string;

  constructor(postId: number, id: number, name: string, email: string, body: string) {
    this.postId = postId;
    this.id = id;
    this.name = name;
    this.email = email;
    this.body = body;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {  }

  getCommentsByPostId(id: number) : Observable<Comment[]> {
    return this.http.get<Comment[]>("https://jsonplaceholder.typicode.com/posts/" + id + "/comments");
  }  
}
