import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() currentAccount: any;
  @Input() transactions: Transaction[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
