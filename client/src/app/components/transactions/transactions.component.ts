import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  @Input() currentAccount: any;
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  createTransaction(form: NgForm, type: string) {
    let temp = new Transaction()
    if (!this.currentAccount) {
      alert('Please select an account')
      return
    }
    temp.accountNumber = this.currentAccount.accountNumber;
    temp.type = type;
    temp.amount = form.value.amount;
    temp.date = new Date();
    temp.insert = form.value.insert || 0;
    temp.pays = form.value.pays || 0;
    this.transactionService.addTransaction(temp).subscribe(msg => console.log(msg))
  }

}
