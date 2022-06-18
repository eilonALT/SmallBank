import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() accounts: Account[] = [];
  currentAccount: any = new Account();
  @Output() accountEmmiter = new EventEmitter();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  setAccount(e: any) {
    this.currentAccount = this.accounts.find(account => account.accountNumber == e.target.value) || [];
    this.accountEmmiter.emit(this.currentAccount)
  }

  createAccount(form: NgForm) {
    let temp = new Account()
    temp.accountNumber = form.value.accountNumber || 0;
    if (temp.accountNumber === 0) {
      alert('Please enter an account number')
      return
    }
    this.accountService.addAccount(temp).subscribe(
      (data: Account) => {
        this.accounts.push(data);
        alert('Account created')
        let modal = document.getElementById('id01');
        if (modal) {
          modal.style.display = 'none';
        }
      })
  }

}
