import { Component, OnInit, OnDestroy } from '@angular/core';
import { Transaction } from '../shared/transaction.model';
import { PostService } from './post.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  groceriesList: Transaction[]; 
  transList: Transaction[];

  constructor(private postsService: PostService) {}



  ngOnInit() {
      this.loadPosts();
      }

    onCreatePost(postData: Transaction) {
      this.postsService.createAndStorePost(postData.name, postData.amount, postData.category).subscribe(responseData=>{
        console.log(responseData);
        this.loadPosts();
      })
    }

    loadPosts() {
      this.postsService.fetchPosts().subscribe(posts => {
        this.transactions=posts; 
        this.groceriesList=posts.filter(item => item.category==="Groceries");
        this.transList=posts.filter(item => item.category==="Transportation");
      });
    }

    onClearPosts() {
      this.postsService.deletePosts().subscribe(() =>{
        this.transactions = []
        this.groceriesList = []
        this.transList = []
      })
    }
  
}
