import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post, PostService } from 'src/services/post.service';
import { CommentService } from 'src/services/comments.service';
import { getSafePropertyAccessString } from '@angular/compiler';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public maxSize: number = 18;
  
  public posts: Post[] = [];


  public filteredPosts: Post[] = [];
  private first: number = 0;
  
  // TODO: make the pagination with the service and the server API (robustness)
  showAmount: number = 10;
  public showAmountOptions: any[] = [
    {name: '10', value: 10},
    {name: '20', value: 20},
    {name: '50', value: 50},
    {name: '100', value: 100}
  ];
  
  actPost!: Post;
  act: boolean = false;
  comments: Comment[][] = [];
  

  constructor(private postService: PostService,
    private commentService: CommentService) {
    // Get the Posts from the service
    console.log("constructor", this.posts);
    this.getAllPosts();
  }
  
  ngOnInit(): void {
    console.log("PostListComponent ngOnInit() ");
    console.log("this.actPost",this.actPost);
  }
  
  getAllPosts(): void {
    this.postService.getPosts().subscribe(
      response => {
        this.posts = [];
        response.map( post => {
          let p = new Post(post.title, post.body, post.userId, post.id);
          this.posts.push(p);
          this.filteredPosts = this.posts.slice(this.first, this.first + this.showAmount);

          // Get the Comments from the service
          this.posts.slice(this.first,this.showAmount).map( (post,id) => {
            // console.log(post,id);
            this.commentService.getCommentsByPostId(id).subscribe( response => {
              // console.log(response);
              // this.comments.push(response);
            });
          })
        });
        console.log(this.posts);
      }, error => console.log(error)
    );
  }

  // showAmount change
  onSAChange(event: any): void {
    console.log(event);
    console.log(this.posts);
    this.showAmount = event.value;
    this.first = 0;
    this.filteredPosts = this.posts.slice(this.first, this.first + this.showAmount);
    this.act = false;
  }

  // Editor switch in on given post
  edit(post: Post): void {
    this.actPost = post;
    this.act = true;
  }

  // Submit the edit of a post
  submitEdit(post: Post): void {
    console.log("submit edit", post);
    this.filteredPosts = this.posts.slice(this.first, this.first + this.showAmount);
    this.act = false;
    this.getAllPosts();
  }
  
  // Edit and than submit the deletion of a post
  submitDelete(id: number): void {
    console.log("submit delete", id);
    this.postService.deletePost(id);
  }

  closeEdit(post: Post): void {
    console.log("colseEdit", post);
    this.posts[post.id] = post;
    this.actPost.id = -1;
    this.act = false;
  }
}
