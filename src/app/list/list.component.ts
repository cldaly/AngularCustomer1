import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'address', 'country'];
  customers:Array<Customer> = [];

  dataSource:any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private customerService:CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
      this.dataSource = new MatTableDataSource<Customer>(this.customers);
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err.message);
    });
  }

}
