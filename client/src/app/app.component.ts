import { Component, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction } from './models/transaction';
import { Account } from './models/account';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  accounts: Account[] = [];
  currentAccount: Account = new Account();
  transactions: Transaction[] = [];

  ngOnChanges() {
    console.log("ngOnChanges called in app component");
  }

  constructor(private accountService: AccountService) {
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.accountService.getAccounts().subscribe(account => {
      this.accounts = account;
    })
  }

  reciveAccount($event: Account) {
    this.currentAccount = $event;
  }

  reciveTransactions($event: Transaction[]) {
    this.transactions = $event;
  }

}
