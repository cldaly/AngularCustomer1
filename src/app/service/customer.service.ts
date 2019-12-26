import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpclient:HttpClient) { }

  getCustomers():Observable<Array<Customer>>{
    return this.httpclient.get<Array<Customer>>('http://localhost:3200/customer');
  }

  addCustomer(c:Customer):Observable<Customer> {
    return this.httpclient.post<Customer>('http://localhost:3200/customer', c);
  }

  updateCustomer(c:Customer):Observable<Customer> {
    return this.httpclient.put<Customer>(`http://localhost:3200/customer/${c.id}`, c)
  }

  deleteCustomer(id:number):Observable<{}> {
    return this.httpclient.delete(`http://localhost:3200/customer/${id}`);
  }
}
