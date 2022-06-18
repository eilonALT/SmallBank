import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { AccountService } from 'src/app/service/account.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  @Input() currentAccount: any;
  transactions: Transaction[] = [];
  @Output() transactionsEmitter = new EventEmitter();

  constructor(private transactionService: TransactionService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log("ngOnChanges called in transactions component");
    this.getTransactionsByAccount();
  }

  createTransaction(form: NgForm, type: string) {
    let temp = new Transaction()

    if (this.currentAccount.accountNumber === 0) {
      alert('Please select an account')
      return
    }

    temp.accountNumber = this.currentAccount.accountNumber;
    temp.type = type;
    temp.amount = form.value.amount || 0;
    temp.date = new Date();
    temp.insert = form.value.insert || 0;
    temp.pays = form.value.pays || 0;

    this.transactionService.addTransaction(temp).subscribe(msg => console.log(msg))

    if (type === 'deposit') {
      this.currentAccount.overallBalance += temp.amount;
    }
    else if (type === 'withdraw') {
      this.currentAccount.overallBalance -= +temp.amount;
    }
    else {
      this.currentAccount.overallBalance += temp.amount;
    }
    this.accountService.updateAccount(this.currentAccount).subscribe(msg => console.log(msg))
    this.getTransactionsByAccount();
  }

  getTransactionsByAccount() {
    this.transactionService.getTransactionsByAccount(this.currentAccount?.accountNumber).subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
        console.log(this.transactions);
        this.transactionsEmitter.emit(this.transactions);
      }
    );
  }
}
