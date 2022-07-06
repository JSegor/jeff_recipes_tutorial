import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from "rxjs/operators";


interface Ingredient {
  item: string;
  amount: string;
}

interface Instruction {
  description: string;
}

@Component({
  selector: 'app-recipe-holder',
  templateUrl: './recipe-holder.component.html',
  styleUrls: ['./recipe-holder.component.css']
})
export class RecipeHolderComponent implements OnInit {
  recipe: string = "";
  recipeName: string = "";
  linkSource: string = "";
  linkName: string = "";
  showLink: boolean = false;
  ingredients: Ingredient[] = [];
  instructions: Instruction[] = [];
  recipeImage: string = "";
  notes: string = "";


  constructor(private route: ActivatedRoute, private titleService: Title, private http: HttpClient) { }

  ngOnInit(): void {
    let self = this;
    this.route.params.subscribe(params => {
      self.recipe = params['recipe'];
      self.recipeImage = 'assets/images/' + self.recipe + '.jpg';
      self.titleService.setTitle(self.recipeName);
      console.log(self.recipe);


      let jeff = self.http.get('/api/' + self.recipe).pipe(map((results) => {

        return results;
      }));


      jeff.subscribe({
        next: (info: any) => {
          // console.log("====== results from host =======");
          // console.log(info);
          self.ingredients = info.ingredients;
          self.instructions = info.instructions;
          self.recipeName = info.name;
          self.notes = info.notes;
          self.linkSource = info.linkSource;
          self.linkName = info.linkName;
          console.log(self.linkName);
          self.showLink = self.linkName !== "" && self.linkName != undefined;
        },

        error: (e) => console.log(e.message),
        complete: () => {
          console.info('complete')


        }


      });

    });



  }

}
