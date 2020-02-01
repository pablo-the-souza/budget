import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subject, Subscription } from 'rxjs';

import { Transaction } from "../shared/transaction.model";
import { PostService } from "./post.service";
import { NgForm } from '@angular/forms';


@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.css"]
})
export class TransactionsComponent implements OnInit, OnDestroy {
  @ViewChild('postForm', {static: true}) slForm: NgForm
  transactions: Transaction[];
  groceriesList: Transaction[];
  transList: Transaction[];
  startedEditing = new Subject<number>()
  subscription: Subscription
  editMode=false; 
  editItemIndex: number; 
  editedItem: Transaction;
  error = null;

  constructor(private postsService: PostService) {}

  ngOnInit() {
    this.loadPosts();
    this.subscription = this.startedEditing
     .subscribe(
       (index: number) => {
         this.editItemIndex = index; 
         this.editMode=true; 
         this.editedItem = this.getTransaction(index)
         this.slForm.setValue({ 
           name: this.editedItem.name,
           amount: this.editedItem.amount,
           category: this.editedItem.category
       })
       }
     )
  }

  onCreatePost(postData: Transaction) {
    this.postsService
      .createAndStorePost(postData.name, postData.amount, postData.category)
      .subscribe(
        responseData => {
          console.log(responseData);
          this.loadPosts();
        },
        error => {
          this.error = error.message;
        }
      );
  }

  loadPosts() {
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.transactions = posts;
        this.groceriesList = posts.filter(
          item => item.category === "Groceries"
        );
        this.transList = posts.filter(
          item => item.category === "Transportation"
        );
      },
      error => {
        this.error = error.message;
      }
    );
  }

  onHandleError() {
    this.error=null; 
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.transactions = [];
      this.groceriesList = [];
      this.transList = [];
    });
  }

  onEditItem(index:number) {
    this.startedEditing.next(index)
  }

  getTransaction(index: number){
    return this.transactions[index]
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }
}
