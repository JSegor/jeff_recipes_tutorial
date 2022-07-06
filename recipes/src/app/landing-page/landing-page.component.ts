import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from "rxjs/operators";
import { DataAccessService } from '../data-access.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  recipes: any[] = [];

  constructor(private router: Router, private http: HttpClient, private dataAccess: DataAccessService) { }

  ngOnInit(): void {
    let self = this;
   this.dataAccess.fetchData('/api/recipes/all-recipes', this, (data:any[])=>{self.recipes = data} );
  }

  onRecipeClick(recipename: string) {
    console.log("======== recipe name ==========");
    console.log(recipename);
    this.router.navigate(['/recipes/' + recipename]);
  }

}
