import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Post {
  public id: number;
  public title: string;
  public body: string;
  public userId: number;

  constructor(title: string, body: string, userId: number, id: number) {
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.id = id;
  }
}

export class PostIDLess {
  public title: string;
  public body: string;
  public userId: number;

  constructor(title: string, body: string, userId: number) {
    this.title = title;
    this.body = body;
    this.userId = userId;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];

  constructor(private http: HttpClient) {  }


  // GETTERS

  getPosts() : Observable<Post[]> {
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
  }
  
  getPostsFromTo(from: number, to: number) {
    // return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
    // TODO
  }

  getPostsByUserID(id: number) : Observable<Post[]> {
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts?userId=" + id);
  }

  // SETTERS - EDIT AND ADD

  editPost(post: Post) : Observable<any> {
    console.log("editPost", post);
    return this.http.put<any>("https://jsonplaceholder.typicode.com/posts/" + post.id, post);
  }

  addPost(postIDLess: PostIDLess) : Observable<any> {
    console.log("addPost", postIDLess);
    return this.http.post<any>("https://jsonplaceholder.typicode.com/posts", postIDLess);
  }

  deletePost(index: number) : Observable<any> {
    return this.http.delete<any>("https://jsonplaceholder.typicode.com/posts/" + index)
  }
}
