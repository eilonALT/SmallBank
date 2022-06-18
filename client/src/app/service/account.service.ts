import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  URL = "http://127.0.0.1:5000/accounts"
  constructor(private http: HttpClient) { }

  /** GET Accounts from the server */
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.URL)
  }

  /** GET Account by id. Will 404 if id not found */
  getAccount(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.URL}/${id}`)
  }

  /** GET Account by id. Will 404 if id not found */
  delAccount(id: string): Observable<Account> {
    return this.http.delete<Account>(`${this.URL}/${id}`)
  }

  /** create a  Account  */
  addAccount(Account: Account): Observable<any> {
    console.log('service add')
    return this.http.post<any>(`${this.URL}`, { 'accountNumber': Account.accountNumber, 'overallBalance': Account.overallBalance })
  }
}
