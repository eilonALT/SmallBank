import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/models/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() accounts: Account[] = [];
  currentAccount: any = new Account();
  @Output() accountEmmiter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  setAccount(e: any) {
    this.currentAccount = this.accounts.find(account => account.accountNumber == e.target.value) || [];
    this.accountEmmiter.emit(this.currentAccount)
  }

}
