import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  DEAFULT_OVERALL_BALANCE = 0;

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
    return this.http.post<any>(`${this.URL}`, { 'accountNumber': Account.accountNumber, 'overallBalance': this.DEAFULT_OVERALL_BALANCE })
  }

  /** update a  Account  */
  updateAccount(Account: any): Observable<any> {
    console.log('service update account')
    return this.http.put<any>(`${this.URL}/${Account._id}`, { 'accountNumber': Account.accountNumber, 'overallBalance': Account.overallBalance })
  }
}
