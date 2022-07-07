import { Component, OnInit } from '@angular/core';
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  status: string = "";
  color: string = "lawngreen";
  turnoff_recipes: boolean = true;
  turnoff_inventory: boolean = true;

  constructor(private dataAccess: DataAccessService) { }

  ngOnInit(): void {
    let self = this;
    this.dataAccess.fetchData('/api/recipes/all-recipes', this, (data: any[]) => {
      if (data.length === 0) {
        self.turnoff_recipes = false;
      } else {
        self.turnoff_recipes = true;
      }
    });
    this.dataAccess.fetchData('/api/inventory/Spices', this, (data: any[]) => {
      if (data.length === 0) {
        self.turnoff_inventory = false;
      } else {
        self.turnoff_inventory = true;
      }
    });
  }

  importRecipes(): void {
    this.dataAccess.executeImport(`/api-import/factory`, this);
    this.turnoff_recipes = true;
  }


  importInventory(): void {
    this.dataAccess.executeImport(`/api-import/inventory`, this);
    this.turnoff_inventory = true;

  }


}
