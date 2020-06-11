import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts :Post[]= [];
  isFetching = false;
  error= null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService:PostService) {}

  ngOnInit() {

    this.errorSub =this.postService.error.subscribe(errorMessage => {
        this.error = errorMessage;
    });

    this.isFetching = true;
    this.postService.fetchPosts().
    subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      console.log(posts);
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // this.http
    //   .post(
    //     'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });
    this.postService.createAndStorePosts(postData.title,postData.content);
   
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().
    subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
      console.log(posts);
    }, error => {
       this.isFetching = false;
        this.error = error.message;
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(()=> {
        this.loadedPosts = [];
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }

}
