import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import {map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostService{

    error: Subject<string> = new Subject<string>();

    constructor(private http:HttpClient){

    }

    createAndStorePosts(title:string, content:string){
        const postData:Post = {title: title, content:content};
        this.http.post('https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
        postData,
        {
            observe:'response' //other values ->data, events
        }).subscribe((data) => {
            console.log(data);
        }, error => {
            this.error.next(error.message);
        });
    }

    fetchPosts(){
        return this.http.get('https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({'Custom-Header':'Hello'}),
            params: new HttpParams().set('print','pretty')
        }).
        pipe(map((responseData: {[key:string]:Post}) => {
          const postArray: Post[] =[];
           for(const key in responseData){
             if(responseData.hasOwnProperty(key))
               postArray.push({...responseData[key], id:key});
           }
           return postArray;
        }),
        catchError(errorRes => {
            return throwError(errorRes);
        })
        );
    }

    deletePosts(){
       return this.http.delete('https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
       {
           observe:'events',
           responseType:'json' //default type is json. Other values -> text, blob etc
       }).pipe(tap(event => {
           console.log(event);
           if(event.type === HttpEventType.Sent){
              // console.log(event.)
           }
           if(event.type === HttpEventType.Response){
            console.log(event.body)
           }        
       }));
    }

}