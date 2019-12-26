import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  updating:boolean;
  id:number;
  customer:Customer;
  uCustomer:Customer;
  searching:boolean;

  constructor(private customerService:CustomerService) { }

  ngOnInit() {
    this.customer = null;
    this.updating = false;
    this.searching = false;
  }

  search(){
    this.searching = false;
    this.customer = null;
    this.customerService.getCustomers().subscribe(data => {
      data.forEach(c => {
        if (c.id == this.id) {
          this.customer = c;
          this.searching = true;
        }
      });
    });
  }

  displayUpdate(){
    if (this.updating) {
      this.uCustomer = null;
      this.updating = false;
    } else {
      this.uCustomer = new Customer();
      this.uCustomer.id = this.customer.id;
      this.uCustomer.name = this.customer.name;
      this.uCustomer.address = this.customer.address;
      this.uCustomer.country = this.customer.country;
      this.updating = true;
    }
  }

  update(){
    this.customerService.updateCustomer(this.uCustomer).subscribe(data => {
      this.updating=false;
      this.customer = this.uCustomer;
      this.uCustomer = null;
    });
  }

  delete() {
    this.customerService.deleteCustomer(this.id).subscribe(data => {
      this.close();
    }, err => {
      console.log(err.message);
    });
  }

  close(){
    this.customer = null;
    this.updating = false;
    this.id = undefined;
    this.searching = false;
  }
}
