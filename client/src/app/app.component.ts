import { Component, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  // addAccount(form: NgForm) {
  //   let temp = new Account()
  //   temp.accountNumber = form.value.accountNumber;
  //   temp.overallBalance = form.value.overallBalance;
  //   this.accountService.addAccount(temp).subscribe(msg => console.log(msg))
  //   this.getAllAccounts()
  // }

  // delAccount(id: string) {
  //   this.accountService.delAccount(id).subscribe(msg => console.log(msg))
  //   this.getAllAccounts()
  // }

}
