import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../shared/transaction.model';
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})

export class PostService {

  constructor(private http: HttpClient) {
    
  }
  createAndStorePost(name: string, amount: number, category: string) {
    const postData: Transaction = {name: name, amount: amount,  category: category}
    return this.http
      .post<{name: string }>(
        'https://budget-dfc78.firebaseio.com/posts.json',
        postData
      )
  }

  fetchPosts() {
    return this.http
    .get< { [key: string]: Transaction }> ('https://budget-dfc78.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
        const postsArray : Transaction[]=[];
        for (const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
          postsArray.push( { ...responseData[key], id:key });
        }
      }
      return postsArray
      })
    )
  }

deletePosts() {
  return this.http.delete('https://budget-dfc78.firebaseio.com/posts.json')
}

}
 