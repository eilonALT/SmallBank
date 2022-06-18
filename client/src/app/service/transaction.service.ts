import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  URL = "http://127.0.0.1:5000/operations"
  constructor(private http: HttpClient) { }

  /** GET Transactions from the server */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.URL)
  }

  /** GET Transaction by id. Will 404 if id not found */
  getTransaction(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.URL}/${id}`)
  }

  getTransactionsByAccount(accountNumber: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.URL}?accountNumber=${accountNumber}`)
  }

  /** create a  Transaction  */
  addTransaction(Transaction: Transaction): Observable<any> {
    console.log('service add')
    return this.http.post<any>(`${this.URL}`, { 'accountNumber': Transaction.accountNumber, 'type': Transaction.type, 'amount': Transaction.amount, 'date': Transaction.date, 'insert': Transaction.insert, 'pays': Transaction.pays })
  }

}
