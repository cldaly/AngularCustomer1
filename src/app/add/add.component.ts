import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  customer:Customer;

  constructor(private customerService:CustomerService, private router:Router) {}

  ngOnInit() {
    this.customer = new Customer();
  }

  addCustomer(){
    this.customerService.addCustomer(this.customer).subscribe(data => {
      console.log(data);
      this.customer = new Customer();
      this.router.navigate(['/view']);
    });
  }
}
