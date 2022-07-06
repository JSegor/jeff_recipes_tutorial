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

  constructor( private dataAccess: DataAccessService) { }

  ngOnInit(): void {
  }

  importRecipes(): void {
    this.dataAccess.executeImport(`/api-import/factory`, this);
  }


  importInventory(): void {
    this.dataAccess.executeImport(`/api-import/inventory`, this);

  }

  
}
