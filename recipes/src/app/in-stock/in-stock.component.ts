import { Component, OnInit } from '@angular/core';

import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-in-stock',
  templateUrl: './in-stock.component.html',
  styleUrls: ['./in-stock.component.css']
})
export class InStockComponent implements OnInit {

  spices: any[] = [];
  meat: any[] = [];
  condiments: any[] = [];
  veggies: any[] = [];
  fruit: any[] = [];
  dairy: any[] = [];
  broth: any[] = [];
  oils: any[] = [];
  pasta: any[] = [];
  grains: any[] = [];
  confections: any[] = [];
  drinks: any[] = [];
  vitamins: any[] = [];
  pastries: any[] = [];
  snacks: any[] = [];
  garden: any[] = [];
  medication: any[] = [];
  other: any[] = [];

  constructor(private dataAccess: DataAccessService) { }

  ngOnInit(): void {
   

    let self = this;

    this.dataAccess.fetchData("/api/inventory/Spices",self, (data: any[]) => self.spices = data);
    this.dataAccess.fetchData("/api/inventory/Meat", self, (data: any[]) => self.meat = data);
    this.dataAccess.fetchData("/api/inventory/Condiments", self, (data: any[]) => self.condiments = data);
    this.dataAccess.fetchData("/api/inventory/Vegetables", self, (data: any[]) => self.veggies = data);
    this.dataAccess.fetchData("/api/inventory/Fruit", self, (data: any[]) => self.fruit = data);
    this.dataAccess.fetchData("/api/inventory/Dairy", self, (data: any[]) => self.dairy = data);
    this.dataAccess.fetchData("/api/inventory/Broth", self,  (data: any[]) => self.broth = data);
    this.dataAccess.fetchData("/api/inventory/Oils", self,  (data: any[]) => self.oils = data);
    this.dataAccess.fetchData("/api/inventory/Pasta", self, (data: any[]) => self.pasta = data);
    this.dataAccess.fetchData("/api/inventory/Grains", self, (data: any[]) => self.grains = data);
    this.dataAccess.fetchData("/api/inventory/Confections", self, (data: any[]) => self.confections = data);
    this.dataAccess.fetchData("/api/inventory/Drinks", self, (data: any[]) => self.drinks = data);
    this.dataAccess.fetchData("/api/inventory/Vitamins and Herbs", self, (data: any[]) => self.vitamins = data);
    this.dataAccess.fetchData("/api/inventory/Pastries", self, (data: any[]) => self.pastries = data);
    this.dataAccess.fetchData("/api/inventory/Snacks", self, (data: any[]) => self.snacks = data);
    this.dataAccess.fetchData("/api/inventory/Garden", self, (data: any[]) => self.garden = data);
    this.dataAccess.fetchData("/api/inventory/Medication", self, (data: any[]) => self.medication = data);
    this.dataAccess.fetchData("/api/inventory/Other", self, (data: any[]) => self.other = data);



  }



}
