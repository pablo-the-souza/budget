import { Transaction } from '../shared/transaction.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostService } from './post.service';
import { Injectable } from '@angular/core';


@Injectable()

export class TransactionsService {
  transactionsChanged = new Subject<Transaction[]>();

  constructor(private http: HttpClient, private postsService: PostService) {}
  
  private transactions: Transaction [] = [
    
  ];
  
  
  


}