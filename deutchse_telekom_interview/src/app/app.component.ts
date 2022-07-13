import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Post, PostService } from 'src/services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deutchse_telekom_interview';

  valToggle: boolean = false;
  newPost: boolean = true;

  public posts: Post[] = [];

  constructor(private primengConfig: PrimeNGConfig) {
    document.documentElement.style.fontSize = "14px";
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
