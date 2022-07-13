import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Post, PostIDLess, PostService } from 'src/services/post.service';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  
  @Input() title: string = "";
  @Input() body: string = "";
  @Input() edit: boolean = false;
  @Input() userId!: number;
  @Input() id!: number;

  @Output() isAdded: EventEmitter<Post> = new EventEmitter();
  @Output() isEdited: EventEmitter<Post> = new EventEmitter();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    console.log("ngOnInit this",this);
    if(this.id == null) {
      this.userId = Math.floor(Math.random()*1000000);
    }
  }

  addPost() {
    console.log("add-post, addPost");
    console.log(this.title, this.body, this.userId);
    
    this.isAdded.emit(new Post(this.title,this.body,this.userId, this.id));
    this.postService.addPost(new PostIDLess(this.title,this.body, this.userId)).subscribe(
      response => console.log("post added, response:",response)
    );
  }
  
  editPost(): void {
    console.log("add-post, editPost");
    console.log(this.title, this.body, this.userId);
    
    this.isEdited.emit(new Post(this.title,this.body,this.userId, this.id));
    this.postService.addPost(new Post(this.title,this.body, this.userId, this.id)).subscribe(
      response => console.log("post added, response:",response)
    );
  }
}
